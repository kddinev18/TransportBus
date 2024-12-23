<script>
import RouteButton from './RouteButton.vue';
export default {
    components: {
        RouteButton
    },
    props:
    {
        routes: Array
    },
    methods:
    {
        routePicked(route) {
            this.$emit('routePicked', route);
        }
    },
    emits: ['routePicked']
}
</script>

<template>
    <div class="flex flex-col justify-between border rounded p-4 w-full h-full">
        <div class="overflow-y-auto">
            <RouteButton v-for="(route, index) in routes" :key="`route-${index}`" :route="route" @route-picked="routePicked"/>
        </div>
    </div>
</template>