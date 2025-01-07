<script>
import AdministrativeMap from '../AdministrativeMap.vue';
import { decode } from '@mapbox/polyline';
import { useRoutesStore } from '../../../../core/stores/routesStore';
import { useStopsStore } from '../../../../core/stores/stopsStore';

export default {
    components: {
        AdministrativeMap,
    },
    data() {
        return {
            routesStore: useRoutesStore(),
            stopsStore: useStopsStore(),
            localPattern: {},
            lines: [],
            stops: [],
            routeStopsData: [],
            autocompleteStops: [],
            headers: [],
            selectedStop: null,
            sequneceStop: null,
        }
    },
    props: {
        pattern: Object,
        color: String
    },
    emits: ['update'],
    methods:
    {
        geoCodeToPoints(path) {
            return decode(path).map((point) => {
                return {
                    lat: point[0],
                    lng: point[1]
                };
            });
        },
        addStop() {
            if (this.selectedStop == null || this.sequneceStop == null) {
                return;
            }
            let stopData = this.stopsStore.getStopById(this.selectedStop);
            this.routeStopsData = [
                ...this.routeStopsData.slice(0, this.sequneceStop - 1),
                {
                    index: this.sequneceStop,
                    id: stopData.id,
                    name: stopData.name
                },
                ...this.routeStopsData.slice(this.sequneceStop - 1)
            ];
            for (let i = 0; i < this.routeStopsData.length; i++) {
                this.routeStopsData[i].index = i + 1;
            }
            this.localPattern.stops = this.routeStopsData.map((item) => item.id);
            this.$emit('update', this.localPattern);
        },
        deleteStop(stop) {
            this.routeStopsData = this.routeStopsData.filter((item) => item.id !== stop.id);
            for (let i = 0; i < this.routeStopsData.length; i++) {
                this.routeStopsData[i].index = i + 1;
            }
            this.localPattern.stops = this.routeStopsData.map((item) => item.id);
            this.$emit('update', this.localPattern);
        },
        loadPattern(updatedPath) {

        },
    },
    created() {
        this.headers = [
            { title: this.$t('administrative.stops.index'), align: 'index', key: 'index', sortable: false },
            { title: this.$t('administrative.stops.id'), align: 'start', key: 'id', sortable: false },
            { title: this.$t('administrative.stops.name'), key: 'name', sortable: false },
            { title: this.$t('administrative.stops.actions'), key: 'actions', sortable: false, align: 'end' },
        ];
        this.autocompleteStops = this.stopsStore.stops.map((stop) => {
            return {
                id: stop.id,
                name: stop.name
            };
        });
        this.lines.push({
            id: this.pattern.index,
            path: this.geoCodeToPoints(this.pattern.geometry),
            geodesic: true,
            strokeColor: this.color,
            strokeOpacity: 1.0,
            strokeWeight: 4,
        });
        for (let i = 0; i < this.pattern.stops.length; i++) {
            let stopData = this.stopsStore.getStopById(this.pattern.stops[i]);
            this.stops.push({
                id: stop,
                center: { lat: stopData.latitude, lng: stopData.longitude },
                radius: 40,
                strokeColor: this.color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: this.color,
                fillOpacity: 0.35
            });
            this.routeStopsData.push(
                {
                    index: i + 1,
                    id: stopData.id,
                    name: stopData.name
                }
            );
        }
    }
}
// https://maps.googleapis.com/maps/api/directions/json
//   ?destination=Concord%2C%20MA
//   &origin=Boston%2C%20MA
//   &waypoints=via%3ACharlestown%2CMA%7Cvia%3ALexington%2CMA
//   &key=YOUR_API_KEY
</script>

<template>
    <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
        Direction: {{ pattern.direction }}
    </h1>
    <div>
        <AdministrativeMap :lines="lines" :stops="stops" />
    </div>
    <div class="flex flex-row justify-between gap-4">
        <v-autocomplete v-model="selectedStop" :items="autocompleteStops" item-title="name" item-value="id"
            :label="$t('administrative.stop.stop')" v-if="!chooseAllRoutes" />
        <v-text-field :label="$t('administrative.stop.index')" v-model.trim="sequneceStop" />
        <v-btn color="primary" icon="mdi-plus" @click="addStop" />
    </div>
    <v-data-table :items="routeStopsData" :headers="headers" :sort-by="[{ key: 'index', order: 'asc' }]">
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon size="small" @click="deleteStop(item)">
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                No stops
            </v-btn>
        </template>
    </v-data-table>
</template>