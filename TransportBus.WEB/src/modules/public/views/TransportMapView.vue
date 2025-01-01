<script>
import TransportMap from '../components/map/TransportMap.vue'
import AppLoader from '../../../core/components/AppLoader.vue';
import { useStopsStore } from '../../../core/stores/stopsStore';
import { useRoutesStore } from '../../../core/stores/routesStore';
import NavigationSidePanel from '../components/navigation/NavigationSidePanel.vue';
import RouteVisualiserSidePannel from '../components/routeVisualisation/RouteVisualiserSidePannel.vue';
import MapTools from '../components/map/MapTools.vue';
import { useMarkersStore } from '../stores/markersStore';

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
            markersStore: useMarkersStore(),
            isLoading: true,
            navigation: null,
            routes: [],
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
        },
        isRouteVisualiserVisible() {
            return this.mapMode == 'bus';
        }
    },
    methods:
    {
        changeMode() {
            this.markersStore.toMarker = null;
            this.markersStore.fromMarker = null;
        },
        mapClicked(coords) {
            if (this.mapMode == 'nav') {
                this.setMarker(coords.lat, coords.lng);
                return;
            }
        },
        setMarker(lat, lng) {
            if (this.markersStore.fromMarker == null) {
                this.markersStore.fromMarker = {
                    id: 'from',
                    position: { lat: lat, lng: lng },
                    label: 'F',
                    title: 'From'
                };
            }
            else if (this.markersStore.toMarker == null) {
                this.markersStore.toMarker = {
                    id: 'to',
                    position: { lat: lat, lng: lng },
                    label: 'T',
                    title: 'To'
                };
            }
        },
        navigationPicked(route) {
            this.navigation = route;
        },
        routesPicked(routes) {
            this.routes = routes;
        },
        navigateBack() {
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
    <MapTools v-model:currentMode="mapMode" default-mode="none" :modes="[
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
    <NavigationSidePanel v-if="isNavigationPannelVisible" @route-picked="navigationPicked"
        @navigate-back="navigateBack" />
    <RouteVisualiserSidePannel v-if="isRouteVisualiserVisible" @routes-selected="routesPicked"
        @navigate-back="navigateBack" />
    <TransportMap :mode="mapMode" :navigation="navigation" :routes="routes" @map-clicked="mapClicked" />
</template>