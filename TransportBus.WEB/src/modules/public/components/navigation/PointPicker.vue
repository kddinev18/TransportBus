<script>
import AppLoader from '../../../../core/components/AppLoader.vue';
import PointForm from './PointForm.vue';
export default {
    components: {
        AppLoader,
        PointForm
    },
    data() {
        return {
            isLoading: false,
            localFromMarker: null,
            localToMarker: null,
        }
    },
    methods: {
        async navigate() {
            const points = [this.$refs.from, this.$refs.to];
            
            const isAllValid = await points.every(async (child) => await child.validatea());
            if (isAllValid) {
                return;
            }
            this.$emit('navigate');
        },
        goBack() {
            this.$emit('navigateBack');
        },
        toggleLoading(isLoading) {
            this.isLoading = isLoading;
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
        }
    },
    emits: ['update:fromMarker', 'update:toMarker', 'navigate', 'navigateBack'],
    watch: {
        fromMarker: {
            handler(newValue) {
                this.localFromMarker = newValue;
            },
        },
        toMarker: {
            handler(newValue) {
                this.localFromMarker = newValue;
            },
        },
        localFromMarker: {
            handler(newValue) {
                this.$emit('update:fromMarker', newValue);
            }
        },
        localToMarker: {
            handler(newValue) {
                this.$emit('update:toMarker', newValue);
            }
        }
    }
}
</script>

<template>
    <AppLoader v-if="isLoading" />
    <template v-else>
        <div class="overflow-y-auto">
            <div class="flex gap-4">
                <v-btn class="col-span-1" density="comfortable" icon="mdi-arrow-left" @click="goBack"></v-btn>
                <h1 class="text-3xl mb-6 font-bold text-primary">
                    {{ $t('public.transportMap.navigation.navigation') }}
                </h1>
            </div>

            <PointForm v-model:point="localFromMarker" pointId="from" pointLabel="from" pointTitle="F"
                resourceExtension="from" @isLoading="toggleLoading" ref="from" />

            <PointForm v-model:point="localToMarker" pointId="to" pointLabel="to" pointTitle="T"
                resourceExtension="to" @isLoading="toggleLoading" ref="to"/>

        </div>
        <div>
            <v-btn color="primary" block @click="navigate">
                {{ $t('public.transportMap.navigation.navigate') }}
            </v-btn>
        </div>
    </template>
</template>