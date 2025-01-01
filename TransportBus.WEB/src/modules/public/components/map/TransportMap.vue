<script>
import { GoogleMap, Polyline, Circle, Marker } from 'vue3-google-map';
import { Secrets } from '../../../../core/utils/secrets';
import { decode } from '@mapbox/polyline';
import { useStopsStore } from '../../../../core/stores/stopsStore';
import { useRoutesStore } from '../../../../core/stores/routesStore';
import { useMarkersStore } from '../../stores/markersStore';
export default {
    components: {
        GoogleMap,
        Polyline,
        Circle,
        Marker
    },
    beforeMount() {
        this.apiKey = Secrets.getGoogleMapsApiKey();
    },
    data() {
        return {
            stopsStore: useStopsStore(),
            routesStore: useRoutesStore(),
            merkersStore: useMarkersStore(),
            apiKey: '',
            restrictions: {
                clickableIcons: false,
                disableDefaultUI: true,
                mapId: '21982fcaf227d4c8',
                minZoom: 12,
                maxZoom: 21,
                zoom: 13,
                center: { lat: 42.485444, lng: 27.448780 },
                bounds: {
                    latLngBounds:
                    {
                        north: 42.755744,
                        south: 42.215144,
                        east: 27.794780,
                        west: 27.102780
                    },
                    strictBounds: false
                }
            },
            lines: [],
            stops: [],
        }
    },
    computed: {
        isFromMarkerVisible() {
            return this.merkersStore.fromMarker != null;
        },
        isToMarkerVisible() {
            return this.merkersStore.toMarker != null;
        }
    },
    props: {
        routes: Array,
        navigation: Object,
        mode: String
    },
    watch: {
        navigation: {
            handler(newValue) {
                if (newValue) {
                    this.navigationPicked(newValue);
                }
                else {
                    this.lines = [];
                    this.stops = [];
                }
            }
        },
        routes: {
            handler(newValue) {
                this.routesPicked(newValue);
            },
            deep: true
        },
        mode: {
            handler() {
                this.changeMode();
            }
        }
    },
    emits: ['mapClicked'],
    methods:
    {
        mapClicked(lat, lng) {
            this.$emit('mapClicked', { lat: lat(), lng: lng() });
        },
        changeMode() {
            this.lines = [];
            this.stops = [];
        },
        geoCodeToPoints(path) {
            return decode(path).map((point) => {
                return {
                    lat: point[0],
                    lng: point[1]
                };
            });
        },
        getStops(fromStopId, toStopId, routeId) {
            let route = this.routesStore.getRouteById(routeId);

            for (const { stops } of route.patterns) {
                const startIndex = stops.indexOf(fromStopId);
                const endIndex = stops.indexOf(toStopId);

                if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
                    return stops.slice(startIndex, endIndex + 1);
                }
            }
        },
        navigationPicked(route) {
            if (route == null) {
                this.lines = [];
                this.stops = [];
                return;
            }
            this.stops = [];
            this.lines = [];
            for (let i = 0; i < route.legs.length; i++) {
                let leg = route.legs[i];
                let color = leg.mode == 'WALK' ? '#000000' : `#${this.routesStore.getRouteById(leg.routeId).color}`;
                this.lines.push({
                    id: i,
                    name: leg.mode,
                    code: leg.mode,
                    path: this.geoCodeToPoints(leg.legGeometry.points),
                    geodesic: true,
                    strokeColor: color,
                    strokeOpacity: 1.0,
                    strokeWeight: 4,
                });

                if (leg.mode == 'BUS') {
                    let stops = this.getStops(leg.from.stopId, leg.to.stopId, leg.routeId);
                    for (let j = 0; j < stops.length; j++) {
                        let stop = this.stopsStore.getStopById(stops[j]);
                        this.stops.push({
                            id: `${i}-${j}`,
                            center: { lat: stop.latitude, lng: stop.longitude },
                            radius: 40,
                            strokeColor: `#${this.routesStore.getRouteById(leg.routeId).color}`,
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: `#${this.routesStore.getRouteById(leg.routeId).color}`,
                            fillOpacity: 0.35
                        });
                    }
                }
            }
        },
        routesPicked(routes) {
            if (routes == null) {
                return;
            }
            this.stops = [];
            this.lines = [];
            for (let i = 0; i < routes.length; i++) {
                let route = this.routesStore.getRouteById(routes[i].id);
                let pattern = route.patterns.find((pattern) => pattern.direction == routes[i].direction);
                if(!pattern) {
                    pattern = route.patterns.find((pattern) => pattern.direction == -1 || pattern.direction == 1);
                }
                console.log('For route', route.id, pattern);
                this.lines.push({
                    id: i,
                    path: this.geoCodeToPoints(pattern.geometry),
                    geodesic: true,
                    strokeColor: `#${route.color}`,
                    strokeOpacity: 1.0,
                    strokeWeight: 4,
                });
                for (let j = 0; j < pattern.stops.length; j++) {
                    let stop = this.stopsStore.getStopById(pattern.stops[j]);
                    this.stops.push({
                        id: `${i}-${j}`,
                        center: { lat: stop.latitude, lng: stop.longitude },
                        radius: 40,
                        strokeColor: `#${route.color}`,
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: `#${route.color}`,
                        fillOpacity: 0.35
                    });
                }
            }
        }
    }
}
</script>

<template>
    <GoogleMap :api-key="apiKey" :center="restrictions.center" :map-id="restrictions.mapId" :zoom="restrictions.zoom"
        :clickableIcons="restrictions.clickableIcons" :disable-default-ui="restrictions.disableDefaultUI"
        :min-zoom="restrictions.minZoom" :max-zoom="restrictions.maxZoom" :restriction="restrictions.bounds"
        class="h-full w-full" @click="mapClicked($event.latLng.lat, $event.latLng.lng)">
        <Circle v-for="stop in stops" :options="stop" :key="`stop-${stop.id}`" />
        <Polyline v-for="line in lines" :options="line" :key="`route-${line.id}`" />
        <Marker v-if="isFromMarkerVisible" :options="merkersStore.fromMarker" />
        <Marker v-if="isToMarkerVisible" :options="merkersStore.toMarker" />
    </GoogleMap>
</template>