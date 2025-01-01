<script>
import { useRoutesStore } from '../../../../core/stores/routesStore';
import { useStopsStore } from '../../../../core/stores/stopsStore';

export default {
    data() {
        return {
            routesStore: useRoutesStore(),
            stopsStore: useStopsStore(),
            patterns: [],
            chosenRoute: null,
            chooseAllRoutes: false,
            allPatternsDirection: 0,
        }
    },
    computed: {
        directionsInputDisabled() {
            return !this.chosenRoute || this.chooseAllRoutes == true;
        }
    },
    methods:
    {
        addRoute() {
            if (!this.chosenRoute) {
                return;
            }
            this.$emit('addRoute', this.chosenRoute);
            this.chosenRoute = null;
        },
        addAllRoutes() {
            this.$emit('addAllRoutes');
            this.chosenRoute = null;
        }
    },
    props: {
        routes: Array
    },
    emits: ['addRoute', 'addAllRoutes'],
}
</script>

<template>
    <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
        {{ $t(`public.transportMap.routeVisualiser.routePicker`) }}
    </h1>
    <v-autocomplete v-model="chosenRoute" :items="routes" item-title="longName" item-value="id"
        :label="$t('public.transportMap.routeVisualiser.route')" v-if="!chooseAllRoutes">
        <template v-slot:item="{ props, item }">
            <div class="flex flex-row items-center pl-4">
                <div class="w-7 h-7 rounded-full flex items-center justify-center"
                    :style="{ backgroundColor: `#${item.raw.color}` }">
                    <p class="font-bold text-sm">
                        {{ item.raw.shortName }}
                    </p>
                </div>
                <v-list-item v-bind="props" :title="item.raw.longName"></v-list-item>
            </div>
        </template>
    </v-autocomplete>
    <div class="gap-4 flex flex-row items-center justify-between">
        <v-btn color="secondary" @click="addAllRoutes">
            {{ $t('public.transportMap.routeVisualiser.addAll') }}
        </v-btn>
        <v-btn color="primary" @click="addRoute">
            {{ $t('public.transportMap.routeVisualiser.addRoute') }}
        </v-btn>
    </div>
</template>