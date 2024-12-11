<script>
import { GoogleMap } from 'vue3-google-map'
import { Secrets } from '../../../core/utils/secrets';

export default {
    components: {
        GoogleMap
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
                startZoom: 13,
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
            }
        }
    },
    created() {
        this.apiKey = Secrets.getGoogleMapsApiKey();
    }
}
</script>

<template>
    <GoogleMap 
    :api-key="apiKey" 
    :center="restrictions.center"
    :clickableIcons="restrictions.clickableIcons" 
    :zoom="restrictions.startZoom"
    :disable-default-ui="restrictions.disableDefaultUI"
    :map-id="restrictions.mapId"
    :min-zoom="restrictions.minZoom"
    :max-zoom="restrictions.maxZoom"
    :restriction="restrictions.bounds"
    class="h-screen w-full">

    </GoogleMap>
</template>