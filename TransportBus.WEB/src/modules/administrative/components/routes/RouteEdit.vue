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
            currentRoute: null,
            currentPatterns: [],
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
        mode: String
    },
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
        addPattern() {
            this.currentPatterns.push({
                index: this.currentPatterns.length + 1,
                direction: '1',
                stops: [],
                geometry: ''
            });
            console.log(this.currentPatterns);
        },
        deletePattern(index) {
            this.currentPatterns = this.currentPatterns.filter((pattern) => pattern.index !== index);
        }
    },
    created() {
        if (this.route && this.route.id != -1) {
            this.currentRoute = this.routesStore.getRouteById(this.route.id);
            this.name = this.route.name;
            this.code = this.route.code;
            this.currentPatterns = this.currentRoute.patterns;
        }
    }
}
</script>

<template>
    <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
        {{ $t('administrative.routes.routeData') }}
    </h1>
    <div class="flex flex-row gap-4 justify-between">
        <v-text-field :label="$t('administrative.route.name')" v-model="name" />
        <v-text-field :label="$t('administrative.route.code')" v-model.trim="code" @blur="v$.code.$touch"
            @input="v$.code.$touch" :error-messages="v$.code.$errors.map(e => e.$message)" />
    </div>
    <div class="flex flex-row justify-between">
        <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
            {{ $t('administrative.routes.directions') }}
        </h1>
        <v-btn color="primary" icon="mdi-plus" @click="addPattern" />
    </div>
    <template v-for="pattern in currentPatterns" :key="`pattern-edit-${pattern.index}`">
        <div class="border rounded p-4 mb-4">
            <div class="flex flex-row justify-between">
                <h1 class="text-xl font-bold text-text text-center mt-1">
                    {{ $t('administrative.stop.direction') }}: {{ pattern.direction }}
                </h1>
                <v-btn color="error" icon="mdi-delete" @click="deletePattern(pattern.index)" />
            </div>
            <RouteStopsEdit :pattern="pattern" />
        </div>
    </template>
</template>