<script>
import { GoogleMap, Polyline, Circle } from 'vue3-google-map'
import { Secrets } from '../../../core/utils/secrets';
import { decode } from '@mapbox/polyline';
import { useStopsStore } from '../../../core/stores/stopsStore'

export default {
    components: {
        GoogleMap,
        Polyline,
        Circle
    },
    data() {
        return {
            stopsStore: useStopsStore(),
            apiKey: '',
            restrictions: {
                clickableIcons: false,
                disableDefaultUI: true,
                mapId: '21982fcaf227d4c8',
                minZoom: 12,
                maxZoom: 21,
                zoom: 13,
                center: { lat: 42.485444, lng: 27.448780 },
                bounds: {
                    latLngBounds:
                    {
                        north: 42.485444,
                        south: 42.485444,
                        east: 27.448780,
                        west: 27.448780
                    },
                    strictBounds: true
                }
            },
            lines: [],
            stops: [],
        }
    },
    props: {
        routes: Array
    },
    beforeMount() {
        this.apiKey = Secrets.getGoogleMapsApiKey();
    },
    methods:
    {
        init()
        {
            for (let route of this.routes) {
                let path = decode(route.path).map((point) => {
                    return {
                        lat: point[0],
                        lng: point[1]
                    };
                });
                console.log('path: ', path);
                this.lines.push({
                    id: route.id,
                    name: route.longName,
                    code: route.shortName,
                    path: path,
                    geodesic: true,
                    strokeColor: route.color,
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                });
                let stops = this.stopsStore.getStopsByIds(route.stops);
                console.log('stops: ', stops);
                for (let stop of stops) {
                    this.stops.push({
                        id: stop.id,
                        center: { lat: stop.latitude, lng: stop.longitude },
                        radius: 70,
                        strokeColor: route.color,
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#000000',
                        fillOpacity: 0.35
                    });
                }
                console.log('stops: ', this.stops);
            }
        }
    },
    watch: {
        'restrictions.zoom'(newZoom, oldZoom) {
            console.log(`Zoom changed from ${oldZoom} to ${newZoom}`);
        }
    }
}
</script>

<template>
    <GoogleMap 
        :api-key="apiKey" 
        :center="restrictions.center"
        :map-id="restrictions.mapId"
        v-model:zoom="restrictions.zoom"
        :clickableIcons="restrictions.clickableIcons" 
        :disable-default-ui="restrictions.disableDefaultUI"
        :min-zoom="restrictions.minZoom"
        :max-zoom="restrictions.maxZoom"
        :restriction="restrictions.bounds"
        class="h-screen w-full"
        >
        <Circle v-for="stop in stops" :options="stop" :key="`stop-${stop.id}`" />
        <Polyline v-for="line in lines" :options="line" :key="`route-${line.id}`" />
    </GoogleMap>
</template>