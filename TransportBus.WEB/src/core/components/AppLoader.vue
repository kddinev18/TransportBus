<script>
import Loading from 'vue-loading-overlay';
export default {
    components: {
        Loading
    },
    props:
    {
        isLoading:{
            type: Boolean,
            default: true
        }
    }
}
</script>

<template>
    <Loading 
        :active="true" 
        v-if="isLoading"
        :can-cancel="false" 
        color="#2596be"
        class="flex flex-row h-full w-full justify-center items-center"
        :is-full-page="true" />
</template>