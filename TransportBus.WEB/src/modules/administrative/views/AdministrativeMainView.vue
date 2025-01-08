<script>
import AdministrativeNavBar from '../components/AdministrativeNavBar.vue';
export default{
    components:
    {
        AdministrativeNavBar
    }
}
</script>

<template>
    <div class="flex h-screen">
        <div class="w-64 min-w-64 max-w-64 bg-gray-100">
            <AdministrativeNavBar />
        </div>

        <div class="flex-1 bg-white overflow-y-scroll">
            <RouterView />
        </div>
    </div>
</template>