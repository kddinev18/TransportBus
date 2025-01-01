<script>
import PointPicker from './PointPicker.vue';
import RoutePicker from './RoutePicker.vue';
import BusNavigationService from '../../services/busNavigationService.js';
import { useMarkersStore } from '../../stores/markersStore';
export default {
    components: {
        PointPicker,
        RoutePicker
    },
    data() {
        return {
            markersStore: useMarkersStore(),
            isNevigateChosen: false,
            routes: []
        }
    },
    methods: {
        async navigate() {
            const response = await BusNavigationService.getNavigation(this.markersStore.fromMarker.position, this.markersStore.toMarker.position);
            if (response.status != 200) {
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
        },
        exitRoutePicker() {
            this.isNevigateChosen = false;
            this.$emit('routePicked', null);

            this.markersStore.fromMarker = null;
            this.markersStore.toMarker = null;
        },
        exitPointPicker() {
            this.$emit('navigateBack');
        },
        async validate() {
            return await this.v$.$validate()
        }
    },
    emits: ['routePicked', 'navigateBack'],
}
</script>

<template>
    <div class="absolute top-4 right-4 bottom-4 transform z-50 p-4 bg-white shadow-md rounded-lg w-1/3">
        <div class="flex flex-col border rounded p-4 w-full h-full">
            <RoutePicker v-if="isNevigateChosen" :routes="routes" @routePicked="routePicked"
                @navigate-back="exitRoutePicker" />
            <PointPicker v-else @navigate="navigate" @navigate-back="exitPointPicker" />
        </div>
    </div>
</template>