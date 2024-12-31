<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import GeoCodeService from '../../services/geocodeService.js'
import AppLoader from '../../../../core/components/AppLoader.vue';
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
            pointAddress: '',
            latitude: '',
            longitude: ''
        }
    },
    validations() {
        return {
            pointAddress: { required },
            latitude: { required },
            longitude: { required }
        }
    },
    methods: {
        async lookUpAddress() {
            if (this.pointAddress == '') {
                return;
            }

            const response = await GeoCodeService.getLocation(this.pointAddress);
            if (response.data.results.length > 0) {
                let lat = response.data.results[0].geometry.location.lat;
                let lng = response.data.results[0].geometry.location.lng;

                this.pointAddress = response.data.results[0].formatted_address;
                this.latitude = response.data.results[0].geometry.location.lat;
                this.longitude = response.data.results[0].geometry.location.lng;
                this.$emit('update:point', {
                    id: this.pointId,
                    position: { lat: lat, lng: lng },
                    label: this.pointLabel,
                    title: this.pointTitle
                });
            }
        },
        async updatePointData(newValue) {
            console.log('emittrue', true);
            const response = await GeoCodeService.getAddress(newValue.position.lat, newValue.position.lng)
            if (response.data.results.length > 0) {
                this.pointAddress = response.data.results[0].formatted_address;
                this.longitude = newValue.position.lat;
                this.latitude = newValue.position.lng;
            }
            else {
                this.$snackbar.add({
                    type: 'error',
                    text: this.$t('public.transportMap.navigation.noAddressFound'),
                });
            }
        },
        async validate()
        {
            return await this.v$.$validate()
        },
        choosePoint() {
            this.$emit('update:point', null);
        },
        camelToPascalCase(str) {
            if (!str) return str; // Handle empty or null strings
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    },
    props: {
        point: {
            type: Object,
            default: null,
        },
        pointId: String,
        pointLabel: String,
        pointTitle: String,
        resourceExtension: String
    },
    emits: ['update:point'],
    watch: {
        point: {
            handler(newValue) {
                if (newValue) {
                    this.updatePointData(newValue);
                }
            }
        },
    }
}
</script>

<template>
    <AppLoader v-if="isLoading" />
    <template v-else>
        <h1 class="text-2xl mb-4 font-bold text-text">
            {{ $t(`public.transportMap.navigation.${resourceExtension}Point`) }}
        </h1>
        <v-text-field :label="$t(`public.transportMap.navigation.${resourceExtension}`)" v-model.trim="pointAddress" @blur="v$.pointAddress.$touch"
            @input="v$.pointAddress.$touch" :error-messages="v$.pointAddress.$errors.map(e => e.$message)" />
        <div class="columns-2">
            <v-text-field :label="$t('public.transportMap.navigation.latitude')" :disabled="true"
                v-model.trim="latitude" class="focus:outline-none focus:ring-0 focus:border-0">
            </v-text-field>
            <v-text-field :label="$t('public.transportMap.navigation.longitude')" :disabled="true"
                v-model.trim="longitude" class="focus:outline-none focus:ring-0 focus:border-0">
            </v-text-field>
        </div>
        <div class="columns-2">
            <v-btn color="primary" block @click="choosePoint">
                {{ $t(`public.transportMap.navigation.choose${camelToPascalCase(resourceExtension)}`) }}
            </v-btn>
            <v-btn color="secondary" block @click="lookUpAddress">
                {{ $t(`public.transportMap.navigation.load${camelToPascalCase(resourceExtension)}`) }}
            </v-btn>
        </div>
    </template>
</template>