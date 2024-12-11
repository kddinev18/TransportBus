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
    <Loading :active="isLoading"
             :can-cancel="false"
             :is-full-page="true"/>
</template>