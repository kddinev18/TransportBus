<script>
import TransportMap from '../components/map/TransportMap.vue'
import AppLoader from '../../../core/components/AppLoader.vue';
import { useStopsStore } from '../../../core/stores/stopsStore';
import { useRoutesStore } from '../../../core/stores/routesStore';
import NavigationSidePanel from '../components/navigation/NavigationSidePanel.vue';
import RouteVisualiserSidePannel from '../components/routeVisualisation/RouteVisualiserSidePannel.vue';
import MapTools from '../components/map/MapTools.vue';

export default {
    components: {
        TransportMap,
        AppLoader,
        NavigationSidePanel,
        RouteVisualiserSidePannel,
        MapTools
    },
    data() {
        return {
            stopsStore: useStopsStore(),
            routesStore: useRoutesStore(),
            isLoading: true,
            pickedRoute: null,
            toMarker: null,
            fromMarker: null,
            mapMode: 'none',
        }
    },
    async mounted() {
        await this.stopsStore.fetchStops();
        await this.routesStore.fetchRoutes();
        this.isLoading = false;
    },
    computed: {
        isNavigationPannelVisible() {
            return this.mapMode == 'nav';
        }
    },
    methods:
    {
        changeMode() {
            this.toMarker = null;
            this.fromMarker = null;
        },
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
        routePicked(route) {
            this.pickedRoute = route;
        },
        closeNavigationPannel() {
            this.mapMode = 'none';
        }
    },
    watch:
    {
        mapMode:
        {
            handler() {
                this.changeMode();
            }
        }
    }
}
</script>

<template>
    <AppLoader :isLoading="isLoading" />
    <MapTools 
        v-model:currentMode="mapMode" 
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
        @route-picked="routePicked"
        @navigate-back="closeNavigationPannel" />
    <RouteVisualiserSidePannel v-if="false"/>
    <TransportMap 
        :mode="mapMode" 
        :route="pickedRoute" 
        :to-marker="toMarker" 
        :from-marker="fromMarker"
        @map-clicked="mapClicked" />
</template>