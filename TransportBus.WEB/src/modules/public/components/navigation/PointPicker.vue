<script>
import PointForm from './PointForm.vue';
import { useMarkersStore } from '../../stores/markersStore';
export default {
    components: {
        PointForm
    },
    data() {
        return {
            merkersStore: useMarkersStore(),
            isLoading: false,
            localFromMarker: null,
            localToMarker: null,
        }
    },
    methods: {
        async navigate() {
            const fromPointValidity = await this.$refs.from.validate();
            const toPointValidity = await this.$refs.to.validate();
            if (fromPointValidity == false || toPointValidity == false) {
                return;
            }
            this.$emit('navigate');
        },
        goBack() {
            this.$emit('navigateBack');
        }
    },
    emits: ['navigate', 'navigateBack'],
}
</script>

<template>
    <div class="flex gap-4">
        <v-btn class="col-span-1" density="comfortable" icon="mdi-arrow-left" @click="goBack"></v-btn>
        <h1 class="text-3xl mb-6 font-bold text-primary">
            {{ $t('public.transportMap.navigation.navigation') }}
        </h1>
    </div>
    <div class="overflow-y-auto mt-2 mb-2 flex-grow">

        <PointForm v-model:point="merkersStore.fromMarker" pointId="from" pointLabel="F" pointTitle="from"
            resourceExtension="from" ref="from" />
        <div class="mt-6">
            <PointForm v-model:point="merkersStore.toMarker" pointId="to" pointLabel="T" pointTitle="to"
                resourceExtension="to" ref="to" />
        </div>


    </div>
    <div class="flex">
        <v-btn color="primary" block @click="navigate">
            {{ $t('public.transportMap.navigation.navigate') }}
        </v-btn>
    </div>
</template>