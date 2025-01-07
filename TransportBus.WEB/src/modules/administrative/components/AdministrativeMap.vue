<script>
import { GoogleMap, Polyline, Circle } from 'vue3-google-map';
import { Secrets } from '../../../core/utils/secrets';
export default {
    components: {
        GoogleMap,
        Polyline,
        Circle,
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
                center: { lat: 42.500054, lng: 27.403582 },
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
    },
}
</script>

<template>
    <GoogleMap :api-key="apiKey" :center="restrictions.center" :map-id="restrictions.mapId" :zoom="restrictions.zoom"
        :clickableIcons="restrictions.clickableIcons" :disable-default-ui="restrictions.disableDefaultUI"
        :min-zoom="restrictions.minZoom" :max-zoom="restrictions.maxZoom" :restriction="restrictions.bounds"
        class="h-full w-full">
        <Circle v-for="stop in stops" :options="stop" :key="`stop-${stop.id}`" />
        <Polyline v-for="line in lines" :options="line" :key="`route-${line.id}`" />
    </GoogleMap>
</template>