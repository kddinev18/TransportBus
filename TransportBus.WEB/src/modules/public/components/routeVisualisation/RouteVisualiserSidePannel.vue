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
        goBack() {
            this.$emit('navigateBack');
        },
        addRoute(route) {
            let routeData = this.routesStore.getRouteById(route);
            this.chosenRoutes.push({
                id: routeData.id,
                name: routeData.longName,
                direction: 0,
                directions: routeData.patterns.map(p => p.direction),
                routeColor: routeData.color,
                stopsColor: routeData.color,
                stopsSize: 20,
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
                    stopsSize: 20,
                    routeThickness: 4,
                    isVisible: true,
                });
            }
            this.availableRoutes = [];
        },
        updateGivenRoute(route) {
            let index = this.chosenRoutes.findIndex(r => r.id == route.id);
            this.chosenRoutes[index] = route;
        },
        removeRoute(routeId) {
            this.chosenRoutes = this.chosenRoutes.filter(r => r.id != routeId);
            let route = this.routesStore.getRouteById(routeId);
            this.availableRoutes.push(route);
            this.availableRoutes.sort((a, b) => a.id - b.id);
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

    <div class="flex gap-4">
        <v-btn class="col-span-1" density="comfortable" icon="mdi-arrow-left" @click="goBack"></v-btn>
        <h1 class="text-3xl mb-6 font-bold text-primary">
            {{ $t('public.transportMap.routeVisualiser.routeVisualiser') }}
        </h1>
    </div>
    <div>
        <RouteSelector @add-route="addRoute" @add-all-routes="addAllRoutes" :routes="availableRoutes">
        </RouteSelector>
    </div>
    <h1 class="text-2xl mb-4 mt-6 font-bold text-text" v-if="chosenRoutes.length > 0">
        {{ $t(`public.transportMap.routeVisualiser.routeVisualOptions`) }}
    </h1>
    <div class="overflow-y-auto flex-grow">
        <RouteOptions class="pr-4" v-for="route in chosenRoutes" :route="route" @update-route="updateGivenRoute"
            :key="`route-key-${route.id}`" @remove-route="removeRoute"></RouteOptions>
    </div>
</template>