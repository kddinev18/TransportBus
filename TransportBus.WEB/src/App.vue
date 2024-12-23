<script>
import { Vue3Snackbar } from "vue3-snackbar";
import NvigationBar from './core/components/NavigationBar.vue'
export default {
  components: {
    NvigationBar,
    Vue3Snackbar
  }
}
</script>

<template>
  <div class="flex h-screen">
    <div class="w-64 min-w-64 max-w-64 bg-gray-100">
      <NvigationBar />
    </div>

    <div class="flex-1 bg-white">
      <RouterView />
    </div>
  </div>
  <Vue3Snackbar bottom center :duration="4000"></Vue3Snackbar>
</template>

<style></style>