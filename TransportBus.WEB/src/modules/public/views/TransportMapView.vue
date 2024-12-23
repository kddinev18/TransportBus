<script>
import TransportMap from '../components/TransportMap.vue'
import AppLoader from '../../../core/components/AppLoader.vue';
import { useStopsStore } from '../../../core/stores/stopsStore';
import NavigationSidePanel from '../components/NavigationSidePanel.vue';
import MapTools from '../components/MapTools.vue';

export default {
    components: {
        TransportMap,
        AppLoader,
        NavigationSidePanel,
        MapTools
    },
    data() {
        return {
            stopsStore: useStopsStore(),
            isLoading: true,
            pickedRoute: null,
            toMarker: null,
            fromMarker: null,
            mapMode: 'none',
        }
    },
    async mounted() {
        await this.stopsStore.fetchStops();
        this.isLoading = false;
    },
    computed: {
        isNavigationPannelVisible() {
            return this.mapMode == 'nav';
        }
    },
    methods:
    {
        mapClicked(coords) {
            if (this.mapMode == 'nav') {
                this.setMarker(coords.lat, coords.lng);
                return;
            }
        },
        setMarker(lat, lng) {
            if (this.fromMarker == null) {
                this.fromMarker = {
                    id: 'from',
                    position: { lat: lat, lng: lng },
                    label: 'F',
                    title: 'From'
                };
            }
            else if (this.toMarker == null) {
                this.toMarker = {
                    id: 'to',
                    position: { lat: lat, lng: lng },
                    label: 'T',
                    title: 'To'
                };
            }
            console.log('set marker', this.fromMarker, this.toMarker);
        },
        changeMode(mode) {
            this.toMarker = null;
            this.fromMarker = null;
            this.mapMode = mode;
        },
        routePicked(route) {
            this.pickedRoute = route;
        }
    }
}
</script>

<template>
    <AppLoader :isLoading="isLoading" />
    <MapTools 
        @mode-changed="changeMode" 
        default-mode="none" 
        :modes="[
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
    <NavigationSidePanel 
        v-if="isNavigationPannelVisible" 
        v-model:to-marker="toMarker" 
        v-model:from-marker="fromMarker"
        @route-picked="routePicked" />
    <TransportMap 
        :mode="mapMode" 
        :route="pickedRoute" 
        :to-marker="toMarker" 
        :from-marker="fromMarker"
        @map-clicked="mapClicked" />
</template>