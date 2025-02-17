<script>
import ColorPickerDialog from '../../../../core/components/ColorPickerDialog.vue';

export default {
    components: {
        ColorPickerDialog
    },
    data() {
        return {
            dialog: true,
            routeData:
            {
                id: 0,
                name: '',
                direction: 0,
                directions: [],
                routeColor: '',
                stopsColor: '',
                stopsSize: 20,
                routeThickness: 4,
                isVisible: true,
            },
            routeColor: '',
            stopsColor: '',

            optionConstraints:
            {
                maxRouteThickness: 10,
                minRouteThickness: 1,
                routeThicknessStep: 1,

                maxStopsSize: 100,
                minStopsSize: 10,
                stopsSizeStep: 10
            },
        }
    },
    methods: {
        removeRoute() {
            this.$emit('removeRoute', this.routeData.id);
        },
        routeColorSelected(color) {
            this.routeColor = '#' +  color;
            this.routeData.routeColor = color;
        },
        stopsColorSelected(color) {
            this.stopsColor = '#' +  color;
            this.routeData.stopsColor = color;
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
                    if (JSON.stringify(this.routeData) !== JSON.stringify(newValue)) {
                        this.routeData = { ...newValue };
                        this.routeColor = '#' + this.routeData.routeColor;
                        this.stopsColor = '#' + this.routeData.stopsColor;
                        console.log(this.routeData);
                    }
                }
            },
            immediate: true,
            deep: true
        },
        routeData: {
            handler(newValue) {
                if (newValue) {
                    if (JSON.stringify(this.route) !== JSON.stringify(newValue)) {
                        this.$emit('updateRoute', newValue);
                    }
                }
            },
            deep: true
        }
    },
    emits: ['updateRoute', 'removeRoute'],
}
</script>

<template>
    <div class="flex gap-4 mb-3 mt-6 align-center justify-between"> 
        <h1 class="text-2xl font-bold text-text">
            {{ routeData.name }}
        </h1>
        <v-btn class="col-span-1" color="error" density="comfortable" icon="mdi-delete" @click="removeRoute"></v-btn>
    </div>
    <div class="flex flex-col space-y-4">
        <div class="flex flex-row justify-between items-center">
            <ColorPickerDialog :start-color="routeColor" @color-selected="routeColorSelected">
                <template v-slot:activator="{ activatorProps }">
                    <v-btn color="primary" v-bind="activatorProps">
                        <div class="flex flex-row items-center justify-between">
                            <div class="w-5 h-5 rounded-full flex items-center justify-center"
                                :style="{ backgroundColor: '#' + routeData.routeColor }">
                            </div>
                            <span class="ml-2">{{ $t('public.transportMap.routeVisualiser.pickRouteColor') }}</span>
                        </div>
                    </v-btn>
                </template>
            </ColorPickerDialog>

            <ColorPickerDialog :start-color="stopsColor" @color-selected="stopsColorSelected">
                <template v-slot:activator="{ activatorProps }">
                    <v-btn color="primary" v-bind="activatorProps">
                        <div class="flex flex-row items-center justify-between">
                            <div class="w-5 h-5 rounded-full flex items-center justify-center"
                                :style="{ backgroundColor: '#' + routeData.stopsColor }">
                            </div>
                            <span class="ml-2">{{ $t('public.transportMap.routeVisualiser.pickStopColor') }}</span>
                        </div>
                    </v-btn>
                </template>
            </ColorPickerDialog>
        </div>
        <v-slider v-model="routeData.routeThickness" :max="optionConstraints.maxRouteThickness"
            :label="$t('public.transportMap.routeVisualiser.routeThickness')" :min="optionConstraints.minRouteThickness"
            class="align-center" :step="optionConstraints.routeThicknessStep">
        </v-slider>
        <v-slider v-model="routeData.stopsSize" :max="optionConstraints.maxStopsSize"
            :min="optionConstraints.minStopsSize" :label="$t('public.transportMap.routeVisualiser.stopsSize')"
            class="align-center" :step="optionConstraints.stopsSizeStep">
        </v-slider>
    </div>
</template>