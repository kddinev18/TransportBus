<script>
export default {

}
</script>

<template>
    <div class="absolute top-4 right-4 bottom-4 transform z-50 p-4 bg-white shadow-md rounded-lg w-1/3">
        <div class="flex flex-col justify-between border rounded p-4 w-full h-full">
            <v-autocomplete v-model="friends" :disabled="isUpdating" :items="people" color="blue-grey-lighten-2"
                item-title="name" item-value="name" label="Select" chips closable-chips multiple>
                <template v-slot:chip="{ props, item }">
                    <v-chip v-bind="props" :prepend-avatar="item.raw.avatar" :text="item.raw.name"></v-chip>
                </template>

                <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props" :prepend-avatar="item.raw.avatar" :subtitle="item.raw.group"
                        :title="item.raw.name"></v-list-item>
                </template>
            </v-autocomplete>
        </div>
    </div>
</template>