<script>
import RouteButton from './RouteButton.vue';
export default {
    components: {
        RouteButton
    },
    data() {
        return {
            selectedRouteIndex: -1
        }
    },
    props:
    {
        routes: Array,
    },
    methods:
    {
        routePicked(route) {
            this.selectedRouteIndex = route.index;
            this.$emit('routePicked', route.route);
        },
        goBack() {
            this.$emit('navigateBack');
        }
    },
    emits: ['routePicked', 'navigateBack']
}
</script>

<template>
    <div class="overflow-y-auto flex flex-col">
        <div class="flex gap-4">
            <v-btn class="col-span-1" density="comfortable" icon="mdi-arrow-left" @click="goBack"></v-btn>
            <h1 class="text-3xl mb-6 font-bold text-primary">
                {{ $t('public.transportMap.navigation.navigation') }}
            </h1>
        </div>
        <RouteButton v-for="(route, index) in routes" :key="`route-${index}`" :route="route" @route-picked="routePicked"
            :index="index" :currentChosenIndex="selectedRouteIndex" />
    </div>
</template>