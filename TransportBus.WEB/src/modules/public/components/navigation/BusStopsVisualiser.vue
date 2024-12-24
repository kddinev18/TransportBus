<script>
import { useStopsStore } from '../../../../core/stores/stopsStore';
import { useRoutesStore } from '../../../../core/stores/routesStore';

export default {
    props:
    {
        routeId: Number,
        fromStopId: Number,
        toStopId: Number
    },
    data() {
        return {
            stopsStore: useStopsStore(),
            routesStore: useRoutesStore(),
            stops: [],
        }
    },
    mounted() {
        const route = this.routesStore.getRouteById(this.routeId);
        if (!route || !route.patterns?.length) {
            this.showErrorSnackbar();
            return;
        }

        let pattern = route.patterns.find(p =>
            p.stops.includes(this.fromStopId) && p.stops.includes(this.toStopId)
        );

        if (!pattern) {
            this.showErrorSnackbar();
            return;
        }

        const startIndex = pattern.stops.indexOf(this.fromStopId);
        const endIndex = pattern.stops.indexOf(this.toStopId);

        if (startIndex > endIndex) {
            this.showErrorSnackbar();
            return;
        }

        this.stops = pattern.stops.slice(startIndex, endIndex + 1);
    },
    methods: {
        showErrorSnackbar() {
            this.$snackbar.add({
                type: 'error',
                text: this.$t('public.transportMap.navigation.cantLoadRoute'),
            });
        },
        getStopName(stopId) {
            return this.stopsStore.getStopById(stopId).name;
        }
    }
}
</script>

<template>
    <div v-for="(stop, index) in stops" :key="`stop-${stop}`">
        <div class="flex flex-row items-center">
            <v-icon color="error" icon="mdi-circle" size="12" class="mr-2 ml-1"></v-icon>
            <p>{{ getStopName(stop) }}</p>
        </div>
        <v-icon v-if="index != stops.length - 1" icon="mdi-dots-vertical" size="18"></v-icon>
    </div>
</template>