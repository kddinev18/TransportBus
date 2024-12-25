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
            chosenPattern: null,
            chooseAllRoutes: false,
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
    computed: {
        routeInputDisabled() {
            return this.chooseAllRoutes == true;
        },
        directionsInputDisabled() {
            return !this.chosenRoute || this.chooseAllRoutes == true;
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
        chooseAllRoutes: {
            handler(val) {
                if (val) {
                    this.$emit('allRoutesChosen');
                }
            }
        }
    },
    emits: ['patternChosen', 'allRoutesChosen'],
}
</script>

<template>
    <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
        {{ $t(`public.transportMap.routeVisualiser.routePicker`) }}
    </h1>
    <v-checkbox v-model="chooseAllRoutes" color="primary" :label="$t(`public.transportMap.routeVisualiser.chooseAllRouites`)"></v-checkbox>
    <v-autocomplete v-model="chosenRoute" :items="routesStore.routes" clearable item-title="longName" item-value="id"
        :label="$t('public.transportMap.routeVisualiser.route')" :disabled="routeInputDisabled">
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
        :disabled="directionsInputDisabled" :label="$t('public.transportMap.routeVisualiser.direction')">
        <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :title="item.raw.value"></v-list-item>
        </template>
    </v-autocomplete>
</template>