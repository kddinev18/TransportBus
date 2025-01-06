<script>
export default {
    data() {
        return {
            color: null
        }
    },
    props:
    {
        startColor: null
    },
    watch: {
        startColor: {
            handler(newValue) {
                this.color = newValue.toLowerCase();
                console.log(this.color);
            },
        }
    },
    methods: {
        saveColor() {
            this.$emit('colorSelected', this.color.split('#')[1]);
        }
    },
    emits: ['colorSelected']
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
                    <v-color-picker v-model="color"></v-color-picker>
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