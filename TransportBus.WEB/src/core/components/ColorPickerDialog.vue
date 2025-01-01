<script>
export default {
    data() {
        return {
            colorData: '#000000'
        }
    },
    props:
    {
        color: 
        {
            type: String,
            default: '#000000'
        }
    },
    watch: {
        color: {
            handler(newValue) {
                this.colorData = newValue;
            },
        }
    },
    methods: {
        saveColor() {
            this.$emit('update:color', this.color);
        }
    },
    emits: ['update:color']
}
</script>

<template>
    <v-dialog width="auto">
        <template v-slot:activator="{ props: activatorProps }">
            <slot name="activator" :activatorProps="activatorProps"></slot>
        </template>
        <template v-slot:default="{ isActive }">
            <v-card prepend-icon="mdi-format-color-fill" :title="$t('common.pickColor')">
                <v-divider class="mt-3"></v-divider>

                <v-card-text class="px-4">
                    <v-color-picker v-model="colorData" hide-inputs></v-color-picker>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-btn :text="$t('common.close')" @click="isActive.value = false"></v-btn>

                    <v-spacer></v-spacer>

                    <v-btn color="surface-variant" :text="$t('common.choose')" variant="flat" @click="() => {
                        isActive.value = false;
                        this.saveColor();
                    }"></v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>