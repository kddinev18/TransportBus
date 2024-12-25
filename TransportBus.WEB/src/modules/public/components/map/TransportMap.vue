<script>
import { GoogleMap, Polyline, Circle, Marker } from 'vue3-google-map';
import { Secrets } from '../../../../core/utils/secrets';
import { decode } from '@mapbox/polyline';
import { useStopsStore } from '../../../../core/stores/stopsStore';
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
            merkersStore: useMarkersStore(),
            apiKey: '',
            restrictions: {
                clickableIcons: false,
                disableDefaultUI: true,
                mapId: '21982fcaf227d4c8',
                minZoom: 13,
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
        route: Object,
        mode: String
    },
    watch: {
        route: {
            handler(newValue) {
                if (newValue) {
                    this.routePicked(newValue);
                }
                else
                {
                    this.lines = [];
                    this.stops = [];
                }
            }
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
        routePicked(route) {
            if(route == null) {
                this.lines = [];
                this.stops = [];
                return;
            }
            this.stops = [];
            this.lines = [];
            for (let i = 0; i < route.legs.length; i++) {
                let leg = route.legs[i];
                let path = decode(leg.legGeometry.points).map((point) => {
                    return {
                        lat: point[0],
                        lng: point[1]
                    };
                });
                let color = leg.mode == 'WALK' ? '#000000' : '#FF0000';
                this.lines.push({
                    id: i,
                    name: leg.mode,
                    code: leg.mode,
                    path: path,
                    geodesic: true,
                    strokeColor: color,
                    strokeOpacity: 1.0,
                    strokeWeight: 3,
                });
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