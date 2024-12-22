<script>
export default {
    data() {
        return {
            currentMode: undefined
        }
    },
    methods: {
        changeMode(mode) {
            this.currentMode = mode;
            this.$emit('modeChanged', mode);
        }
    },
    props: {
        modes: Array,
        defaultMode: String
    },
    emits: ['modeChanged'],
    mounted() {
        this.currentMode = this.defaultMode;
    }
}
</script>

<template>
    <div class="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-white shadow-md rounded-lg">
        <div class="inline-flex rounded-md shadow-sm" role="group">
            <button v-for="(mode, index) in modes" type="button"
                class="px-4 py-2 text-sm font-medium bg-white border border-gray-200 hover:bg-gray-200" :class="[
                    currentMode == mode.mode ? 'z-10 ring-2 ring-blue-700' : '',
                    index == 0 ? 'rounded-l' : '',
                    index == modes.length - 1 ? 'rounded-r' : ''
                ]" @click="changeMode(mode.mode)" :key="`mapOption-${mode.mode}`">
                <v-icon color="text" :icon="mode.icon" size="large"></v-icon>
            </button>
        </div>
    </div>
</template>