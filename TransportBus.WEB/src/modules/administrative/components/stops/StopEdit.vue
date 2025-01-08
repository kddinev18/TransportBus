<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useStopsStore } from '../../../../core/stores/stopsStore';
import AdministrativeMap from '../common/AdministrativeMap.vue';

export default {
    components: {
        AdministrativeMap
    },
    data() {
        return {
            routesStore: useStopsStore(),
            name: '',
            code: '',
            longitude: 0,
            latitude: 0,
            stopLocationMarker: null
        }
    },
    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        return {
            name: { required },
            code: { required },
            latitude: { required },
            longitude: { required }
        }
    },
    props: {
        stop: Object,
        mode: String
    },
    methods:
    {
        mapClicked(center) {
            this.longitude = center.lng;
            this.latitude = center.lat;
            this.stopLocationMarker =
            {
                position: center,
                label: 'S',
                title: 'Stop'
            };
        },
    },
    created() {
        if (this.stop && this.stop.id != -1) {
            this.name = this.stop.name;
            this.code = this.stop.code;
            this.latitude = this.stop.latitude;
            this.longitude = this.stop.longitude;
            this.stopLocationMarker =
            {
                position: { lat: this.latitude, lng: this.longitude },
                label: 'S',
                title: 'Stop'
            };
        }
    }
}
</script>

<template>
    <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
        {{ $t('administrative.stops.stopData') }}
    </h1>
    <div class="flex flex-row gap-4 justify-between">
        <v-text-field :label="$t('administrative.stop.name')" v-model.trim="name" @blur="v$.name.$touch"
            @input="v$.name.$touch" :error-messages="v$.name.$errors.map(e => e.$message)" />
        <v-text-field :label="$t('administrative.stop.code')" v-model.trim="code" @blur="v$.code.$touch"
            @input="v$.code.$touch" :error-messages="v$.code.$errors.map(e => e.$message)" />
    </div>
    <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
        {{ $t('administrative.stops.stopLocation') }}
    </h1>
    <div class="flex flex-row gap-4 justify-between">
        <v-text-field :label="$t('administrative.stop.latitude')" v-model.trim="latitude" @blur="v$.latitude.$touch"
            @input="v$.latitude.$touch" :error-messages="v$.latitude.$errors.map(e => e.$message)" disabled />
        <v-text-field :label="$t('administrative.stop.longitude')" v-model.trim="longitude" @blur="v$.longitude.$touch"
            @input="v$.longitude.$touch" :error-messages="v$.longitude.$errors.map(e => e.$message)" disabled/>
    </div>
    <div>
        <AdministrativeMap @map-clicked="mapClicked" :marker-center="stopLocationMarker" class="h-72"/>
    </div>
</template>