<script>
import { useVuelidate } from '@vuelidate/core'
import RouteStopsEdit from './RouteStopsEdit.vue';
import { required } from '@vuelidate/validators'
import { decode } from '@mapbox/polyline';
import { useRoutesStore } from '../../../../core/stores/routesStore';

export default {
    components: {
        RouteStopsEdit
    },
    data() {
        return {
            routesStore: useRoutesStore(),
            name: '',
            code: '',
            lines: [],
            stops: [],
            currentRoute: null
        }
    },
    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        return {
            name: { required },
            code: { required },
        }
    },
    props: {
        route: {
            type: Object,
            required: false
        },
        isEditing: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update'],
    methods:
    {
        geoCodeToPoints(path) {
            return decode(path).map((point) => {
                return {
                    lat: point[0],
                    lng: point[1]
                };
            });
        },
    },
    created() {
        if (this.route) {
            this.currentRoute = this.routesStore.getRouteById(this.route.id);
            this.name = this.route.name;
            this.code = this.route.code;
        }
    }
}
// https://maps.googleapis.com/maps/api/directions/json
//   ?destination=Concord%2C%20MA
//   &origin=Boston%2C%20MA
//   &waypoints=via%3ACharlestown%2CMA%7Cvia%3ALexington%2CMA
//   &key=YOUR_API_KEY
</script>

<template>
    <div class="flex flex-row gap-4">
        <v-text-field :label="$t('administrative.route.name')" v-model.trim="name" @blur="v$.name.$touch"
            @input="v$.name.$touch" :error-messages="v$.name.$errors.map(e => e.$message)" />
        <v-text-field :label="$t('administrative.route.code')" v-model.trim="code" @blur="v$.code.$touch"
            @input="v$.code.$touch" :error-messages="v$.code.$errors.map(e => e.$message)" />
    </div>
    <RouteStopsEdit v-for="pattern in currentRoute.patterns" :pattern="pattern" :key="`pattern-edit-${pattern}`" />
</template>