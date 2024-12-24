<script>
import { useRoutesStore } from '../../../../core/stores/routesStore';
import { useStopsStore } from '../../../../core/stores/stopsStore';

export default {
    data() {
        return {
            routesStore: useRoutesStore(),
            stopsStore: useStopsStore(),
            autocompleteRoutes: [],
            chosenRoute: null
        }
    },
    created() {
        this.autocompleteRoutes = this.routesStore.routes
            .flatMap(item => item.patterns.map(innerItem => ({
                longName: item.longName,
                shortName: item.shortName,
                color: item.color,
                fromStop: this.stopsStore.getStopById(innerItem.stops[0]).name.split(' / ')[0],
                toStop: this.stopsStore.getStopById(innerItem.stops[innerItem.stops.length - 1]).name.split(' / ')[0]
            })));
        console.log(this.autocompleteRoutes);
    }
}
</script>

<template>
    <div class="absolute top-4 right-4 bottom-4 transform z-50 p-4 bg-white shadow-md rounded-lg w-1/3">
        <div class="flex flex-col justify-between border rounded p-4 w-full h-full">
            <v-autocomplete v-model="chosenRoute" :items="autocompleteRoutes" color="blue-grey-lighten-2" clearable
                item-title="longName" item-value="longName" label="Select">
                <template v-slot:item="{ props, item }">
                    <div class="flex flex-row items-center pl-4">
                        <div class="w-7 h-7 rounded-full flex items-center justify-center"
                            :style="{ backgroundColor: `#${item.raw.color}` }">
                            <p class="font-bold text-sm">
                                {{ item.raw.shortName }}
                            </p>
                        </div>
                        <v-list-item v-bind="props" :subtitle="`${item.raw.fromStop} - ${item.raw.toStop}`"
                            :title="item.raw.longName"></v-list-item>
                    </div>
                </template>
            </v-autocomplete>
        </div>
    </div>
</template>