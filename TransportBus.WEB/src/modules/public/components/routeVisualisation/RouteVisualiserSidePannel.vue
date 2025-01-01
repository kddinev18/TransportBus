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
            patterns: [],
            chosenRoute: null,
            chosenPattern: null
        }
    },
    methods: {
        getPatterns() {
            if (this.chosenRoute) {
                this.patterns = this.routesStore.getRouteById(this.chosenRoute).patterns.map(pattern => {
                    return {
                        id: pattern.index,
                        value: `${this.getStopName(pattern.stops[0])} - ${this.getStopName(pattern.stops[pattern.stops.length - 1])}`,
                        raw: pattern
                    }
                });
            }
        },
        getStopName(stopId) {
            return this.stopsStore.getStopById(stopId).name.split(' / ')[0];
        },
        optionsChanged(options) {
            console.log(options);
        }
    },
    watch: {
        chosenRoute: {
            handler(val) {
                if (val) {
                    this.getPatterns();
                }
                else {
                    this.patterns = [];
                }
            }
        },
        chosenPattern: {
            handler(val) {
                if (val) {
                    this.$emit('patternChosen', val.raw);
                }
            }
        },
    },
    emits: ['patternChosen'],
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
            <RouteSelector></RouteSelector>
            <RouteOptions @options-changed="optionsChanged"></RouteOptions>
        </div>
    </div>
</template>