<script>
import { GoogleMap, Polyline, Circle, Marker } from 'vue3-google-map';
import { Secrets } from '../../../core/utils/secrets';
import { decode } from '@mapbox/polyline';
import { useStopsStore } from '../../../core/stores/stopsStore';
import MapTools from './MapTools.vue';
import NavigationSidePanel from './NavigationSidePanel.vue';
export default {
    components: {
        GoogleMap,
        Polyline,
        Circle,
        MapTools,
        NavigationSidePanel,
        Marker
    },
    beforeMount() {
        this.apiKey = Secrets.getGoogleMapsApiKey();
    },
    data() {
        return {
            stopsStore: useStopsStore(),
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
            mapMode: 'none',
            lines: [],
            stops: [],
            fromMaker: null,
            toMarker: null,
        }
    },
    computed: {
        isFromMarkerVisible() {
            return this.fromMaker != null;
        },
        isToMarkerVisible() {
            return this.toMarker != null;
        },
        isNavigationPannelVisible() {
            return this.mapMode == 'nav';
        }
    },
    props: {
        routes: Array
    },
    methods:
    {
        mapClicked(lat, lng) {
            console.log('map clicked: ', lat(), lng());
            if(this.mapMode == 'nav') {
                console.log('nav mode');
                this.setMarker(lat(), lng());
                return;
            }
        },
        setMarker(lat, lng) {
            if(this.fromMaker == null) {
                this.fromMaker = {
                    id: 'from',
                    position: { lat: lat, lng: lng },
                    label: 'F',
                    title: 'From'
                };
                return;
            }
            if(this.toMarker == null) {
                this.toMarker = {
                    id: 'to',
                    position: { lat: lat, lng: lng },
                    label: 'T',
                    title: 'To'
                };
                return;
            }
        },
        changeMode(mode) {
            this.lines = [];
            this.stops = [];
            this.fromMaker = null;
            this.toMarker = null;
            console.log('mode: ', mode);
            this.mapMode = mode;
        },
        routePicked(route) {
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
    <div class="relative h-screen w-full">
        <MapTools @mode-changed="changeMode" default-mode="none" :modes="[
            {
                mode: 'nav',
                icon: 'mdi-navigation'
            },
            {
                mode: 'bus',
                icon: 'mdi-bus'
            },
            {
                mode: 'none',
                icon: 'mdi-hand'
            }
        ]" />
        <NavigationSidePanel v-if="isNavigationPannelVisible" v-model:to-marker="toMarker" v-model:from-marker="fromMaker" @route-picked="routePicked"/>
        <GoogleMap :api-key="apiKey" :center="restrictions.center" :map-id="restrictions.mapId"
            :zoom="restrictions.zoom" :clickableIcons="restrictions.clickableIcons"
            :disable-default-ui="restrictions.disableDefaultUI" :min-zoom="restrictions.minZoom"
            :max-zoom="restrictions.maxZoom" :restriction="restrictions.bounds" class="h-screen w-full"
            @click="mapClicked($event.latLng.lat, $event.latLng.lng)">
            <Circle v-for="stop in stops" :options="stop" :key="`stop-${stop.id}`" />
            <Polyline v-for="line in lines" :options="line" :key="`route-${line.id}`" />
            <Marker v-if="isFromMarkerVisible" :options="fromMaker" />
            <Marker v-if="isToMarkerVisible" :options="toMarker" />
        </GoogleMap>
    </div>
</template>