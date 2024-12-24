<script>
import GeoCodeService from '../../services/geocodeService.js'
import BusStopsVisualiser from './BusStopsVisualiser.vue'
export default {
    components: {
        BusStopsVisualiser
    },
    props:
    {
        isExpanded: Boolean,
        legs: Array
    },
    data() {
        return {
            legPlaceNames: {}
        };
    },
    methods:
    {
        async resolveLegPlaceNames() {
            for (const [index, leg] of this.legs.entries()) {
                const fromKey = `${index}-from`; // Use the index for uniqueness
                const toKey = `${index}-to`;

                // Resolve and store place names
                this.legPlaceNames[fromKey] = await this.getLegFromPlaceName(leg);
                this.legPlaceNames[toKey] = await this.getLegToPlaceName(leg);
            }
        },
        async getLegFromPlaceName(leg) {
            if (leg.from.name == 'Origin') {
                return (await GeoCodeService.getAddress(leg.from.lat, leg.from.lon)).data.results[0].formatted_address;
            }
            return leg.from.name;
        },
        async getLegToPlaceName(leg) {
            if (leg.to.name == 'Destination') {
                return (await GeoCodeService.getAddress(leg.to.lat, leg.to.lon)).data.results[0].formatted_address;
            }
            return leg.to.name;
        },
    },
    watch:
    {
        legs: {
            handler() {
                this.resolveLegPlaceNames(); // Re-resolve names when legs change
            },
            immediate: true // Run on component mount
        }
    }

}
</script>

<template>
    <div v-if="isExpanded" class="mb-4 mr-3 ml-3 p-4 bg-secondary rounded-bl-md rounded-br-md">
        <div v-for="(leg, index) in legs" :key="`leg-${index}`">

            <template v-if="leg.mode == 'WALK'">
                <div class="flex flex-row items-center w-full" :class="[index == legs.length - 1 ? '' : 'mb-4']">
                    <v-icon color="background" icon="mdi-walk" size="18"></v-icon>
                    <div class="flex flex-col items-start ml-2 bg-accent p-2 rounded-lg w-full">
                        <div class="flex flex-row items-center">
                            <v-icon color="error" icon="mdi-circle" size="12" class="mr-2 ml-1"></v-icon>
                            <p>{{ legPlaceNames[`${index}-from`] || '...' }}</p>
                        </div>
                        <v-icon icon="mdi-dots-vertical" size="18"></v-icon>
                        <div class="flex flex-row items-center">
                            <v-icon color="error" icon="mdi-circle" size="12" class="mr-2 ml-1"></v-icon>
                            <p>{{ legPlaceNames[`${index}-to`] || '...' }}</p>
                        </div>
                    </div>
                </div>
            </template>

            <template v-if="leg.mode == 'BUS'">
                <div class="flex flex-row items-center w-full" :class="[index == legs.length - 1 ? '' : 'mb-4']">
                    <v-icon color="background" icon="mdi-bus" size="18"></v-icon>
                    <div class="flex flex-col items-start ml-2 bg-accent p-2 rounded-lg w-full">
                        <BusStopsVisualiser :route-id="leg.routeId" :from-stop-id="leg.from.stopId"
                            :to-stop-id="leg.to.stopId" />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>