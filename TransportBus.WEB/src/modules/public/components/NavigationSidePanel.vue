<script>
import PointPicker from './PointPicker.vue';
import RoutePicker from './RoutePicker.vue';
import BusNavigationService from '../services/busNavigationService.js';
export default {
    components: {
        PointPicker,
        RoutePicker
    },
    data() {
        return {
            fromMarkerLocal: null,
            toMarkerLocal: null,
            isNevigateChosen: false,
            routes: []
        }
    },
    methods: {
        async navigate() {
            const response = await BusNavigationService.getNavigation(this.fromMarkerLocal.position, this.toMarkerLocal.position);
            if(response.status != 200) {
                this.$snackbar.add({
                    type: 'error',
                    text: this.$t('public.transportMap.navigation.noRoutesFound'),
                });
                return;
            }
            this.routes = response.data.plan.itineraries;
            this.isNevigateChosen = true;
        },
        routePicked(route) {
            this.$emit('routePicked', route);
        }
    },
    props: {
        fromMarker: {
            type: Object,
            default: null,
        },
        toMarker: {
            type: Object,
            default: null,
        },
    },
    emits: ['update:fromMarker', 'update:toMarker', 'routePicked'],
    watch: {
        fromMarker: {
            handler(newValue) {
                if (newValue) {
                    this.fromMarkerLocal = newValue;
                }
            }
        },
        toMarker: {
            handler(newValue) {
                if (newValue) {
                    this.toMarkerLocal = newValue;
                }
            },
        },
        fromMarkerLocal: {
            handler(newValue) {
                this.$emit('update:fromMarker', newValue);
            }
        },
        toMarkerLocal: {
            handler(newValue) {
                this.$emit('update:toMarker', newValue);
            }
        }
    }
}
</script>

<template>
    <div class="absolute top-4 right-4 bottom-4 transform z-50 p-4 bg-white shadow-md rounded-lg w-1/3">
        <RoutePicker v-if="isNevigateChosen" :routes="routes" @routePicked="routePicked" />
        <PointPicker v-else v-model:from-marker="fromMarkerLocal" v-model:to-marker="toMarkerLocal"
            @navigate="navigate" />
    </div>
</template>