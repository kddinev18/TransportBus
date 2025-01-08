<script>
import { GoogleMap, Polyline, Circle, Marker } from 'vue3-google-map';
import { Secrets } from '../../../../core/utils/secrets';
export default {
    components: {
        GoogleMap,
        Polyline,
        Circle,
        Marker
    },
    beforeMount() {
        this.apiKey = Secrets.getGoogleMapsApiKey();
    },
    data() {
        return {
            apiKey: '',
            restrictions: {
                clickableIcons: false,
                disableDefaultUI: true,
                mapId: '21982fcaf227d4c8',
                minZoom: 12,
                maxZoom: 21,
                zoom: 13,
                center: { lat: 42.50309715260346, lng: 27.469533760501378 },
                bounds: {
                    latLngBounds:
                    {
                        north: 42.755744,
                        south: 42.215144,
                        east: 27.794780,
                        west: 27.102780
                    },
                    strictBounds: false
                }
            }
        }
    },
    props: {
        lines: Array,
        stops: Array,
        markerCenter: {
            type: Object,
            default: null
        }
    },
    computed:
    {
        isMarkerVisible() {
            return this.markerCenter != null;
        }
    },
    emits: ['mapClicked'],
    methods: {
        mapClicked(lat, lng) {
            this.$emit('mapClicked', { lat: lat(), lng: lng() });
        },
    }
}
</script>

<template>
    <GoogleMap :api-key="apiKey" :center="restrictions.center" :map-id="restrictions.mapId" :zoom="restrictions.zoom"
        :clickableIcons="restrictions.clickableIcons" :disable-default-ui="restrictions.disableDefaultUI"
        :min-zoom="restrictions.minZoom" :max-zoom="restrictions.maxZoom" :restriction="restrictions.bounds"
        class="h-full w-full" @click="mapClicked($event.latLng.lat, $event.latLng.lng)">
        <Circle v-for="stop in stops" :options="stop" :key="`stop-${stop.id}`" />
        <Polyline v-for="line in lines" :options="line" :key="`route-${line.id}`" />
        <Marker v-if="isMarkerVisible" :options="markerCenter" />
    </GoogleMap>
</template>