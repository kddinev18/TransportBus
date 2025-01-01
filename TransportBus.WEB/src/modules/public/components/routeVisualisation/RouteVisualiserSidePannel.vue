<script>
import { useRoutesStore } from '../../../../core/stores/routesStore';
import { useStopsStore } from '../../../../core/stores/stopsStore';
import RouteOptions from './RouteOptions.vue';
import RouteSelector from './RouteSelector.vue';

export default {
    components: {
        RouteSelector,
        RouteOptions
    },
    data() {
        return {
            routesStore: useRoutesStore(),
            stopsStore: useStopsStore(),
            chosenRoutes: [],
            availableRoutes: [],
        }
    },
    created() {
        this.availableRoutes = this.routesStore.routes;
    },
    methods: {
        addRoute(route) {
            let routeData = this.routesStore.getRouteById(route);
            this.chosenRoutes.push({
                id: routeData.id,
                color: routeData.color,
                direction: 0,
                stopsSize: 2,
                routeThickness: 4,
                isVisible: true,
            });
            this.availableRoutes = this.availableRoutes.filter(r => r.id != route);
        },
        addAllRoutes() {
            for (const route of this.availableRoutes) {
                this.chosenRoutes.push({
                    id: route.id,
                    name: route.longName,
                    direction: 0,
                    directions: route.patterns.map(p => p.direction),
                    routeColor: route.color,
                    stopsColor: route.color,
                    stopsSize: 2,
                    routeThickness: 4,
                    isVisible: true,
                });
            }
            this.availableRoutes = [];
        },
        updateGivenRoute(route)
        {
            let index = this.chosenRoutes.findIndex(r => r.id == route.id);
            this.chosenRoutes[index] = route;
        }
    },
    watch: {
        chosenRoutes: {
            handler(newValue) {
                this.$emit('routesSelected', newValue);
            },
            deep: true
        }
    },
    emits: ['routesSelected'],
}
</script>

<template>
    <div class="absolute top-4 right-4 bottom-4 transform z-50 p-4 bg-white shadow-md rounded-lg w-1/3">
        <div class="border rounded p-4 w-full h-full">
            <div class="flex gap-4">
                <v-btn class="col-span-1" density="comfortable" icon="mdi-arrow-left" @click="goBack"></v-btn>
                <h1 class="text-3xl mb-6 font-bold text-primary">
                    {{ $t('public.transportMap.routeVisualiser.routeVisualiser') }}
                </h1>
            </div>
            <RouteSelector @add-route="addRoute" @add-all-routes="addAllRoutes" :routes="availableRoutes">
            </RouteSelector>
            <RouteOptions v-for="route in routes" :routes="route" @update-route="updateGivenRoute" :key="`route-key-${route.id}`"></RouteOptions>
        </div>
    </div>
</template>