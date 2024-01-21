<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
body {
  background-color: #181818;
}

header {
  background-color: #282828;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1em;
}
</style>
