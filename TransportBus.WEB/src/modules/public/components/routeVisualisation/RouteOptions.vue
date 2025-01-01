<script>
import ColorPickerDialog from '../../../../core/components/ColorPickerDialog.vue';

export default {
    components: {
        ColorPickerDialog
    },
    data() {
        return {
            dialog: true,
            routeData: null
        }
    },
    methods: {
        init(newValue) {
            this.routeData = newValue;
        }
    },
    props:
    {
        route: Object
    },
    watch: {
        route: {
            handler(newValue) {
                if (newValue) {
                    this.init(newValue);
                }
            },
            deep: true
        },
        routeData: {
            handler(newValue) {
                this.$emit('updateRoute', newValue);
            },
            deep: true
        }
    },
    emits: ['updateRoute']
}
</script>

<template>
    <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
        {{ routeData.name }}
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