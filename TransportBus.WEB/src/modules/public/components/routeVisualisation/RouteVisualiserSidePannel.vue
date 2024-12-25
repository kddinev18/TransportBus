<script>
import { useRoutesStore } from '../../../../core/stores/routesStore';
import { useStopsStore } from '../../../../core/stores/stopsStore';

export default {
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
                    {{ $t('public.transportMap.routeVisualiser.v') }}
                </h1>
            </div>
            <v-autocomplete v-model="chosenRoute" :items="routesStore.routes" clearable item-title="longName"
                item-value="id" :label="$t('public.transportMap.routeVisualiser.route')">
                <template v-slot:item="{ props, item }">
                    <div class="flex flex-row items-center pl-4">
                        <div class="w-7 h-7 rounded-full flex items-center justify-center"
                            :style="{ backgroundColor: `#${item.raw.color}` }">
                            <p class="font-bold text-sm">
                                {{ item.raw.shortName }}
                            </p>
                        </div>
                        <v-list-item v-bind="props" :title="item.raw.longName"></v-list-item>
                    </div>
                </template>
            </v-autocomplete>
            <v-autocomplete v-model="chosenPattern" :items="patterns" clearable item-title="value" item-value="value"
                :label="$t('public.transportMap.routeVisualiser.direction')">
                <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props" :title="item.raw.value"></v-list-item>
                </template>
            </v-autocomplete>
        </div>
    </div>
</template>