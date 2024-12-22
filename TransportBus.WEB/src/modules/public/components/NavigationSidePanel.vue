<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import GeoCodeService from '../services/geocodeService.js'
export default {
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            from: '',
            to: '',
            fromLatitude: '',
            fromLongitude: '',
            toLatitude: '',
            toLongitude: ''
        }
    },
    validations() {
        return {
            from: { required },
            to: { required }
        }
    },
    methods: {
        lookUpFromAddress() {
            GeoCodeService.getLocation(this.from).then((response) => {
                console.log(response.data);
                this.from = response.data.results[0].formatted_address;
                this.fromLatitude = response.data.results[0].geometry.location.lat;
                this.fromLongitude = response.data.results[0].geometry.location.lng;
            });
        },
        lookUpТоAddress() {
            GeoCodeService.getLocation(this.to).then((response) => {
                console.log(response.data);
                this.to = response.data.results[0].formatted_address;
                this.toLatitude = response.data.results[0].geometry.location.lat;
                this.toLongitude = response.data.results[0].geometry.location.lng;
            });
        },

        chooseLocation(markerId) {
            this.$emit('update:markers', this.markers.filter(m => m.id !== markerId));
        },

        fillUpLocations()
        {
            const fromMarker = this.markers.find(m => m.id === 'from');
            const toMarker = this.markers.find(m => m.id === 'to');

            if (fromMarker)
            {
                GeoCodeService.getAddress(fromMarker.position.lat, fromMarker.position.lng).then((response) => {
                    this.from = response.data.results[0].formatted_address;
                    this.fromLatitude = fromMarker.position.lat;
                    this.fromLongitude = fromMarker.position.lng;
                });
            }
            if (toMarker)
            {
                GeoCodeService.getAddress(toMarker.position.lat, toMarker.position.lng).then((response) => {
                    this.to = response.data.results[0].formatted_address;
                    this.toLatitude = toMarker.position.lat;
                    this.toLongitude = toMarker.position.lng;
                });
            }
        }
    },
    props: {
        markers: Array,
    },
    emits: ['update:markers'],
    watch: {
        markers(newValue) {
            console.log('test',newValue);
            this.fillUpLocations();
        },
    },
}
</script>

<template>
    <div class="flex absolute top-4 right-4 bottom-4 transform z-50 p-4 bg-white shadow-md rounded-lg">
        <div class="flex flex-col border rounded p-4 overflow-y-auto">
            <h1 class="text-3xl mb-6 font-bold text-primary">
                {{ $t('public.transportMap.navigation') }}
            </h1>

            <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
                {{ $t('public.transportMap.fromPoint') }}
            </h1>
            <v-text-field :label="$t('public.transportMap.from')"
                    v-model.trim="from"
                    @blur="v$.from.$touch"
                    @input="v$.from.$touch"
                    :error-messages="v$.from.$errors.map(e => e.$message)"/>
            <div class="columns-2">
                <v-text-field :label="$t('public.transportMap.latitude')" disabled="true" v-model.trim="fromLatitude">
                </v-text-field>
                <v-text-field :label="$t('public.transportMap.longitude')" disabled="true" v-model.trim="fromLongitude">
                </v-text-field>
            </div>
            <div class="columns-2">
                <v-btn color="primary" block @click="chooseLocation('from')">
                    {{ $t('public.transportMap.chooseFrom') }}
                </v-btn>
                <v-btn color="secondary" block @click="lookUpFromAddress">
                    {{ $t('public.transportMap.loadFrom') }}
                </v-btn>
            </div>

            <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
                {{ $t('public.transportMap.toPoint') }}
            </h1>
            <v-text-field :label="$t('public.transportMap.to')"
                    v-model.trim="to"
                    @blur="v$.to.$touch"
                    @input="v$.to.$touch"   
                    :error-messages="v$.to.$errors.map(e => e.$message)"/>
            <div class="columns-2">
                <v-text-field outline :label="$t('public.transportMap.latitude')" disabled="true" v-model.trim="toLatitude">
                </v-text-field>
                <v-text-field :label="$t('public.transportMap.longitude')" disabled="true" v-model.trim="toLongitude">
                </v-text-field>
            </div>
            <div class="columns-2">
                <v-btn color="primary" block @click="chooseLocation('to')">
                    {{ $t('public.transportMap.chooseTo') }}
                </v-btn>
                <v-btn color="secondary" block @click="lookUpТоAddress">
                    {{ $t('public.transportMap.loadTo') }}
                </v-btn>
            </div>

            <v-btn class="mt-6" color="primary" block>
                {{ $t('public.transportMap.navigate') }}
            </v-btn>
        </div>
    </div>
</template>