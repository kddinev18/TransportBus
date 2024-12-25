<script>
import { integer } from '@vuelidate/validators';
import { useRoutesStore } from '../../../../core/stores/routesStore';
import { useStopsStore } from '../../../../core/stores/stopsStore';
import ColorPickerDialog from '../../../../core/components/ColorPickerDialog.vue';

export default {
    components: {
        ColorPickerDialog
    },
    data() {
        return {
            routesStore: useRoutesStore(),
            stopsStore: useStopsStore(),
            route: null,
            dialog: true
        }
    },
    methods: {
        init() {
            let route = this.routesStore.getRouteById(this.routeId);
            this.route =
            {
                shortName: route.shortName,
                longName: route.longName,
                color: route.color,
                stops: route.patterns.find(p => p.index == this.patternId).stops.map(stopId => this.stopsStore.getStopById(stopId)),
                geometry: route.patterns.find(p => p.index == this.patternId).geometry
            }
        }
    },
    props:
    {
        routeId: integer,
        patternId: integer
    },
    watch: {
        routeId: {
            handler(val) {
                if (val) {
                    this.init();
                }
            }
        }
    },
}
</script>

<template>
    <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
        tet
    </h1>
    <div class="pa-4 text-center">
        <ColorPickerDialog>
            <template v-slot:activator="{ activatorProps }">
                <v-btn color="brown" prepend-icon="mdi-earth" text="Select Country" variant="outlined"
                    v-bind="activatorProps"></v-btn>
            </template>
        </ColorPickerDialog>
    </div>
</template>