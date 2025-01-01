<script>
import { integer } from '@vuelidate/validators';
import { useRoutesStore } from '../../../../core/stores/routesStore';
import { useStopsStore } from '../../../../core/stores/stopsStore';
import ColorPickerDialog from '../../../../core/components/ColorPickerDialog.vue';

export default {
    components: {
        ColorPickerDialog
    },
    data() {
        return {
            routesStore: useRoutesStore(),
            stopsStore: useStopsStore(),
            optionsData: {
                minRouteThickness: 1,
                maxRouteThickness: 10,

                minStopsSize: 1,
                maxStopsSize: 10,

                startRouteThickness: 2,
                startStopsSize: 1,

                routeThicknessStep: 1,
                stopsSizeStep: 1
            },
            options: {
                route: {
                    id: 0,
                    color: '000000',
                    shortName: '',
                    longName: '',
                    stops: [],
                    geometry: null,
                },
                stopsColor: '000000',
                routeThickness: 2,
                stopsSize: 1
            },
            dialog: true
        }
    },
    methods: {
        routeColorSelected(color) {
            if (color) {
                this.options.route.color = color;
            }
        },
        stopsColorSelected(color) {
            if (color) {
                this.options.stopsColor = color;
            }
        },
        init() {
            let route = this.routesStore.getRouteById(this.routeId);
            this.options.route =
            {
                id: route.id,
                shortName: route.shortName,
                longName: route.longName,
                color: route.color,
                stops: route.patterns.find(p => p.index == this.patternId).stops.map(stopId => this.stopsStore.getStopById(stopId)),
                geometry: route.patterns.find(p => p.index == this.patternId).geometry,
            }
            this.options.stopsColor = route.color;
        }
    },
    props:
    {
        routeId: integer,
        patternId: integer
    },
    watch: {
        routeId: {
            handler(val) {
                if (val) {
                    this.init();
                }
            }
        },
        patternId: {
            handler(val) {
                if (val) {
                    this.$emit('optionsChanged', this.options);
                }
            },
            deep: true
        },
    },
    emits: ['optionsChanged']
}
</script>

<template>
    <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
        {{ options.route.longName }}
    </h1>
    <div class="flex flex-col space-y-4">
        <div class="flex flex-row justify-between items-center">
            <ColorPickerDialog @color-selected="routeColorSelected" :startColor="options.route.color">
                <template v-slot:activator="{ activatorProps }">
                    <v-btn color="primary" v-bind="activatorProps">
                        <div class="flex flex-row items-center justify-between">
                            <div class="w-5 h-5 rounded-full flex items-center justify-center"
                                :style="{ backgroundColor: `#${options.route.color}` }">
                            </div>
                            <span class="ml-2">{{ $t('public.transportMap.routeVisualiser.pickRouteColor') }}</span>
                        </div>
                    </v-btn>
                </template>
            </ColorPickerDialog>

            <ColorPickerDialog @color-selected="stopsColorSelected" :startColor="options.route.stopsColor">
                <template v-slot:activator="{ activatorProps }">
                    <v-btn color="primary" v-bind="activatorProps">
                        <div class="flex flex-row items-center justify-between">
                            <div class="w-5 h-5 rounded-full flex items-center justify-center"
                                :style="{ backgroundColor: `#${options.route.color}` }">
                            </div>
                            <span class="ml-2">{{ $t('public.transportMap.routeVisualiser.pickStopColor') }}</span>
                        </div>
                    </v-btn>
                </template>
            </ColorPickerDialog>
        </div>
        <v-slider v-model="options.routeThickness" :max="optionsData.maxRouteThickness" :label="$t('public.transportMap.routeVisualiser.routeThickness')"
            :min="optionsData.minRouteThickness" class="align-center" :step="optionsData.routeThicknessStep">
        </v-slider>
        <v-slider v-model="options.stopsSize" :max="optionsData.maxStopsSize" :min="optionsData.minStopsSize" :label="$t('public.transportMap.routeVisualiser.stopsSize')"
            class="align-center" :step="optionsData.stopsSizeStep">
        </v-slider>
    </div>
</template>