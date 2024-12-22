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
            default: false
        }
    }
}
</script>

<template>
    <Loading 
        :active="true" 
        v-if="isLoading"
        :can-cancel="false" 
        class="flex flex-row min-h-screen justify-center items-center"
        :is-full-page="true" />
</template>