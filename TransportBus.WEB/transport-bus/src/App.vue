<script>
  import NvigationBar from './core/components/NavigationBar.vue'
  export default {
    components: {
      NvigationBar
    }
  }
</script>

<template>
  <main>
    <aside class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <NvigationBar />
    </aside>
    <RouterView class="sm:ml-64" />
  </main>
</template>

<style>
</style>