<script>
import { Vue3Snackbar } from "vue3-snackbar";
export default {
  components: {
    Vue3Snackbar
  }
}
</script>

<template>
  <div class="flex h-screen">
    <div class="flex-1 bg-white">
      <RouterView />
    </div>
  </div>
  <Vue3Snackbar bottom center :duration="4000"></Vue3Snackbar>
</template>

<style></style>