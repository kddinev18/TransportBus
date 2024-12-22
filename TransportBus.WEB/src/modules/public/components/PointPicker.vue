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
        async lookUpFromAddress() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) {
                return;
            }
            GeoCodeService.getLocation(this.from).then((response) => {
                let lat = response.data.results[0].geometry.location.lat;
                let lng = response.data.results[0].geometry.location.lng;
                console.log(response.data);

                this.from = response.data.results[0].formatted_address;
                this.fromLatitude = lat;
                this.fromLongitude = lng;
                this.$emit('update:fromMarker', {
                    id: 'from',
                    position: { lat: lat, lng: lng },
                    label: 'F',
                    title: 'From'
                });
            });
        },
        async lookUpТоAddress() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) {
                return;
            }
            GeoCodeService.getLocation(this.to).then((response) => {
                let lat = response.data.results[0].geometry.location.lat;
                let lng = response.data.results[0].geometry.location.lng;
                console.log(response.data);

                this.to = response.data.results[0].formatted_address;
                this.toLatitude = response.data.results[0].geometry.location.lat;
                this.toLongitude = response.data.results[0].geometry.location.lng;
                this.$emit('update:toMarker', {
                    id: 'to',
                    position: { lat: lat, lng: lng },
                    label: 'T',
                    title: 'To'
                });
            });
        },
        chooseFromLocation() {
            console.log('chooseFromLocation');
            this.$emit('update:fromMarker', null);
        },
        chooseToLocation() {
            console.log('chooseToLocation');
            this.$emit('update:toMarker', null);
        },
    },
    props: {
        fromMarker: {
            type: Object,
            default: null,
        },
        toMarker: {
            type: Object,
            default: null,
        },
    },
    emits: ['update:fromMarker', 'update:toMarker'],
    watch: {
        fromMarker: {
            handler(newValue) {
                console.log(newValue);
                if (newValue) {
                    GeoCodeService.getAddress(newValue.position.lat, newValue.position.lng).then((response) => {
                        this.from = response.data.results[0].formatted_address;
                        this.fromLatitude = newValue.position.lat;
                        this.fromLongitude = newValue.position.lng;
                    });
                }
            }
        },
        toMarker: {
            handler(newValue) {
                console.log(newValue);
                if (newValue) {
                    GeoCodeService.getAddress(newValue.position.lat, newValue.position.lng).then((response) => {
                        this.to = response.data.results[0].formatted_address;
                        this.toLatitude = newValue.position.lat;
                        this.toLongitude = newValue.position.lng;
                    });
                }
            },
        }
    }
}
</script>

<template>
    <h1 class="text-3xl mb-6 font-bold text-primary">
        {{ $t('public.transportMap.navigation') }}
    </h1>

    <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
        {{ $t('public.transportMap.fromPoint') }}
    </h1>
    <v-text-field :label="$t('public.transportMap.from')" v-model.trim="from" @blur="v$.from.$touch"
        @input="v$.from.$touch" :error-messages="v$.from.$errors.map(e => e.$message)" />
    <div class="columns-2">
        <v-text-field :label="$t('public.transportMap.latitude')" :disabled="true" v-model.trim="fromLatitude">
        </v-text-field>
        <v-text-field :label="$t('public.transportMap.longitude')" :disabled="true" v-model.trim="fromLongitude">
        </v-text-field>
    </div>
    <div class="columns-2">
        <v-btn color="primary" block @click="chooseFromLocation">
            {{ $t('public.transportMap.chooseFrom') }}
        </v-btn>
        <v-btn color="secondary" block @click="lookUpFromAddress">
            {{ $t('public.transportMap.loadFrom') }}
        </v-btn>
    </div>

    <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
        {{ $t('public.transportMap.toPoint') }}
    </h1>
    <v-text-field :label="$t('public.transportMap.to')" v-model.trim="to" @blur="v$.to.$touch" @input="v$.to.$touch"
        :error-messages="v$.to.$errors.map(e => e.$message)" />
    <div class="columns-2">
        <v-text-field outline :label="$t('public.transportMap.latitude')" :disabled="true" v-model.trim="toLatitude">
        </v-text-field>
        <v-text-field :label="$t('public.transportMap.longitude')" :disabled="true" v-model.trim="toLongitude">
        </v-text-field>
    </div>
    <div class="columns-2">
        <v-btn color="primary" block @click="chooseToLocation">
            {{ $t('public.transportMap.chooseTo') }}
        </v-btn>
        <v-btn color="secondary" block @click="lookUpТоAddress">
            {{ $t('public.transportMap.loadTo') }}
        </v-btn>
    </div>

    <v-btn class="mt-6" color="primary" block>
        {{ $t('public.transportMap.navigate') }}
    </v-btn>
</template>