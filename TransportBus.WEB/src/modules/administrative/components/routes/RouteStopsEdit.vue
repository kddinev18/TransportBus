<script>
import AdministrativeMap from '../common/AdministrativeMap.vue';
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
                    name: stopData.name,
                    lat: stopData.latitude,
                    lon: stopData.longitude
                },
                ...this.routeStopsData.slice(this.sequneceStop - 1)
            ];
            for (let i = 0; i < this.routeStopsData.length; i++) {
                this.routeStopsData[i].index = i + 1;
            }
        },
        deleteStop(stop) {
            this.routeStopsData = this.routeStopsData.filter((item) => item.id !== stop.id);
            for (let i = 0; i < this.routeStopsData.length; i++) {
                this.routeStopsData[i].index = i + 1;
            }
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
                    name: stopData.name,
                    lat: stopData.latitude,
                    lon: stopData.longitude
                }
            );
        }
    }
}
</script>

<template>
    <div class="h-96 mb-4 mt-4">
        <AdministrativeMap :lines="lines" :stops="stops" />
    </div>
    <div class="flex flex-row justify-between gap-4">
        <v-autocomplete v-model="selectedStop" :items="autocompleteStops" item-title="name" item-value="id"
            :label="$t('administrative.stops.stop')" v-if="!chooseAllRoutes" />
        <v-text-field :label="$t('administrative.stops.index')" v-model.trim="sequneceStop" />
        <v-btn color="primary" icon="mdi-plus" @click="addStop" />
    </div>
    <v-data-table :items="routeStopsData" :headers="headers" :sort-by="[{ key: 'index', order: 'asc' }]">
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon size="small" @click="deleteStop(item)">
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <h1 class="text-l text-text">
                {{ $t('administrative.stops.noStops') }}
            </h1>
        </template>
    </v-data-table>
</template>