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
            let temp = [];
            for (const route of this.routesStore.routes) {
                temp.push({
                    id: route.id,
                    color: route.color,
                    direction: 0,
                    stopsSize: 2,
                    routeThickness: 4,
                    isVisible: true,
                });
            }
            this.chosenRoutes = temp;
            this.availableRoutes = [];
        },
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
            <RouteOptions v-model:routes="chosenRoutes"></RouteOptions>
        </div>
    </div>
</template>