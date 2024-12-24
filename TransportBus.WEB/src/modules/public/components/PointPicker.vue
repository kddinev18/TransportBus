<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import GeoCodeService from '../services/geocodeService.js'
import AppLoader from '../../../core/components/AppLoader.vue';

export default {
    components: {
        AppLoader
    },
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            isLoading: false,
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
            to: { required },
            fromLatitude: { required },
            fromLongitude: { required },
            toLatitude: { required },
            toLongitude: { required }
        }
    },
    methods: {
        async lookUpFromAddress() {
            if (this.from == '') {
                return;
            }

            this.isLoading = true;

            const response = await GeoCodeService.getLocation(this.from)
            if (response.data.results.length > 0) {
                let lat = response.data.results[0].geometry.location.lat;
                let lng = response.data.results[0].geometry.location.lng;

                this.from = response.data.results[0].formatted_address;
                this.fromLatitude = lat;
                this.fromLongitude = lng;
                this.$emit('update:fromMarker', {
                    id: 'from',
                    position: { lat: lat, lng: lng },
                    label: 'F',
                    title: 'From'
                });
            }

            this.isLoading = false;
        },
        async lookUpТоAddress() {
            if (this.to == '') {
                return;
            }

            this.isLoading = true;

            const response = await GeoCodeService.getLocation(this.to);
            if (response.data.results.length > 0) {
                let lat = response.data.results[0].geometry.location.lat;
                let lng = response.data.results[0].geometry.location.lng;

                this.to = response.data.results[0].formatted_address;
                this.toLatitude = response.data.results[0].geometry.location.lat;
                this.toLongitude = response.data.results[0].geometry.location.lng;
                this.$emit('update:toMarker', {
                    id: 'to',
                    position: { lat: lat, lng: lng },
                    label: 'T',
                    title: 'To'
                });
            }

            this.isLoading = false;
        },
        chooseFromLocation() {
            this.$emit('update:fromMarker', null);
        },
        chooseToLocation() {
            this.$emit('update:toMarker', null);
        },
        async navigate() {
            const result = await this.v$.$validate()
            if (!result) {
                return;
            }
            this.$emit('navigate');
        }
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
    emits: ['update:fromMarker', 'update:toMarker', 'navigate'],
    watch: {
        fromMarker: {
            handler(newValue) {
                if (newValue) {
                    this.isLoading = true;
                    GeoCodeService.getAddress(newValue.position.lat, newValue.position.lng).then((response) => {
                        this.from = response.data.results[0].formatted_address;
                        this.fromLatitude = newValue.position.lat;
                        this.fromLongitude = newValue.position.lng;
                        this.isLoading = false;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.isLoading = false;
                    });
                }
            }
        },
        toMarker: {
            handler(newValue) {
                if (newValue) {
                    this.isLoading = true;
                    GeoCodeService.getAddress(newValue.position.lat, newValue.position.lng).then((response) => {
                        this.to = response.data.results[0].formatted_address;
                        this.toLatitude = newValue.position.lat;
                        this.toLongitude = newValue.position.lng;
                        this.isLoading = false;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.isLoading = false;
                    });
                }
            },
        }
    }
}
</script>

<template>
    <AppLoader v-if="isLoading" />
    <template v-else>
        <div class="flex flex-col justify-between border rounded p-4 w-full h-full">
            <div class="overflow-y-auto">
                <h1 class="text-3xl mb-6 font-bold text-primary">
                    {{ $t('public.transportMap.navigation.navigation') }}
                </h1>

                <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
                    {{ $t('public.transportMap.navigation.fromPoint') }}
                </h1>
                <v-text-field :label="$t('public.transportMap.navigation.from')" v-model.trim="from" @blur="v$.from.$touch"
                    @input="v$.from.$touch" :error-messages="v$.from.$errors.map(e => e.$message)" />
                <div class="columns-2">
                    <v-text-field :label="$t('public.transportMap.navigation.latitude')" :disabled="true"
                        v-model.trim="fromLatitude">
                    </v-text-field>
                    <v-text-field :label="$t('public.transportMap.navigation.longitude')" :disabled="true"
                        v-model.trim="fromLongitude">
                    </v-text-field>
                </div>
                <div class="columns-2">
                    <v-btn color="primary" block @click="chooseFromLocation">
                        {{ $t('public.transportMap.navigation.chooseFrom') }}
                    </v-btn>
                    <v-btn color="secondary" block @click="lookUpFromAddress">
                        {{ $t('public.transportMap.navigation.loadFrom') }}
                    </v-btn>
                </div>

                <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
                    {{ $t('public.transportMap.navigation.toPoint') }}
                </h1>
                <v-text-field :label="$t('public.transportMap.navigation.to')" v-model.trim="to" @blur="v$.to.$touch"
                    @input="v$.to.$touch" :error-messages="v$.to.$errors.map(e => e.$message)" />
                <div class="columns-2">
                    <v-text-field outline :label="$t('public.transportMap.navigation.latitude')" :disabled="true"
                        v-model.trim="toLatitude">
                    </v-text-field>
                    <v-text-field :label="$t('public.transportMap.navigation.longitude')" :disabled="true"
                        v-model.trim="toLongitude">
                    </v-text-field>
                </div>
                <div class="columns-2">
                    <v-btn color="primary" block @click="chooseToLocation">
                        {{ $t('public.transportMap.navigation.chooseTo') }}
                    </v-btn>
                    <v-btn color="secondary" block @click="lookUpТоAddress">
                        {{ $t('public.transportMap.navigation.loadTo') }}
                    </v-btn>
                </div>
            </div>
            <div>
                <v-btn color="primary" block @click="navigate">
                    {{ $t('public.transportMap.navigation.navigate') }}
                </v-btn>
            </div>
        </div>
    </template>
</template>