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
        mode: String,
        trigger: Boolean
    },
    watch: {
        trigger() {
            console.log('trigger');
            this.validate();
        }
    },
    emits: ['validate'],
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
        async validate() {
            const isValid = await this.v$.$validate();
            this.$emit('validate', {
                isValid: isValid,
                data:
                {
                    id: this.stop.id,
                    name: this.name,
                    code: this.code,
                    latitude: this.latitude,
                    longitude: this.longitude
                }
            });
        }
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
        <v-text-field :label="$t('administrative.stops.name')" v-model.trim="name" @blur="v$.name.$touch"
            @input="v$.name.$touch" :error-messages="v$.name.$errors.map(e => e.$message)" />
        <v-text-field :label="$t('administrative.stops.code')" v-model.trim="code" @blur="v$.code.$touch"
            @input="v$.code.$touch" :error-messages="v$.code.$errors.map(e => e.$message)" />
    </div>
    <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
        {{ $t('administrative.stops.stopLocation') }}
    </h1>
    <div class="flex flex-row gap-4 justify-between">
        <v-text-field :label="$t('administrative.stops.latitude')" v-model.trim="latitude" @blur="v$.latitude.$touch"
            @input="v$.latitude.$touch" :error-messages="v$.latitude.$errors.map(e => e.$message)" disabled />
        <v-text-field :label="$t('administrative.stops.longitude')" v-model.trim="longitude" @blur="v$.longitude.$touch"
            @input="v$.longitude.$touch" :error-messages="v$.longitude.$errors.map(e => e.$message)" disabled />
    </div>
    <div class="h-72">
        <AdministrativeMap @map-clicked="mapClicked" :marker-center="stopLocationMarker" />
    </div>
</template>