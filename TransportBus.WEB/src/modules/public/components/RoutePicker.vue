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
        routePicked(route, index) {
            this.selectedRouteIndex = index;
            this.$emit('routePicked', route);
        }
    },
    emits: ['routePicked']
}
</script>

<template>
    <div class="flex flex-col justify-between border rounded p-4 w-full h-full">
        <div class="overflow-y-auto">
            <RouteButton v-for="(route, index) in routes" :key="`route-${index}`" :route="route"
                @route-picked="routePicked" :index="index" :currentChosenIndex="selectedRouteIndex" />
        </div>
    </div>
</template>