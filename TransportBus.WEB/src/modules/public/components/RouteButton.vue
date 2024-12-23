<script>
import RouteButtonExpandionPannel from './RouteButtonExpandionPannel.vue';
export default {
    components: {
        RouteButtonExpandionPannel
    },
    data() {
        return {
            isExpanded: false
        }
    },
    props:
    {
        route: Object,
        index: Number,
        currentChosenIndex: Number
    },
    methods:
    {
        getDuration(totalSeconds) {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            const roundedSeconds = Math.round(seconds / 5) * 5;
            return `${minutes}m ${roundedSeconds}s`;
        },
        getTime(timestamp) {
            const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
            const hours = String(date.getHours()).padStart(2, '0'); // Get hours and format to 2 digits
            const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes and format to 2 digits
            return `${hours}:${minutes}`;
        },
        getMinutes(totalSeconds) {
            return `${Math.floor(totalSeconds / 60)} ${this.$t('common.minutesShort')}`;
        },
        routePicked() {
            this.isExpanded = !this.isExpanded;
            this.$emit('routePicked', this.route, this.index);
        }
    },
    emits: ['routePicked'],
    watch: {
        currentChosenIndex:
        { 
            handler(newValue) {
                if (newValue != this.index) {
                    this.isExpanded = false;
                }
            }
        }
    }
}
</script>

<template>
    <div class="p-4 bg-primary shadow-md rounded-lg w-full" :class="[isExpanded ? '' : 'mb-4']" @click="routePicked(route)">
        <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col items-start">
                <h1 class="text-mg font-bold text-white">{{ `${getTime(route.startTime)} -
                    ${getTime(route.endTime)}` }}</h1>
            </div>
            <div class="flex flex-col items-end">
                <h1 class="text-mg font-bold text-white">{{ getMinutes(route.duration) }}</h1>
            </div>
        </div>
        <div class="flex flex-row justify-between items-center mt-4">
            <template v-for="(leg, index) in route.legs" :key="`icon-${index}`">
                <div class="flex flex-row items-center">
                    <v-icon color="background" v-if="leg.mode == 'WALK'" icon="mdi-walk" size="18"></v-icon>
                    <v-icon color="background" v-else icon="mdi-bus" size="18"></v-icon>
                    <div class="flex flex-col items-start ml-2 bg-accent p-2 rounded-lg">
                        <p v-if="leg.mode == 'WALK'" class="text-sm font-bold text-white">{{
                            getMinutes(leg.endTime -
                                leg.startTime) }}</p>
                        <p v-else class="text-sm font-bold text-white">{{ leg.route }}</p>
                    </div>
                </div>
                <v-icon color="background" v-if="index != route.legs.length - 1" icon="mdi-arrow-right-thick"
                    size="13"></v-icon>
            </template>
        </div>
    </div>
    <RouteButtonExpandionPannel :is-expanded="isExpanded"/>
</template>