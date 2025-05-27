<!-- App.vue -->
<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Aside from '@/components/layout/Aside.vue'

import '@/assets/reset.css'
import '@/assets/main.css'

const route = useRoute()

const fullScreenRoutes = [
  '/all', '/baby_animal', '/baby_food',
  '/brand', '/event', '/goevent',
  '/liked', '/cart', '/login', '/not_found'
]
const isFullScreen = computed(() =>
  fullScreenRoutes.includes(route.path) || route.path.startsWith('/product')
)
</script>

<template>
  <Header />
  <div class="page-content">
    <router-view />
  </div>
  <Footer />
  <Aside />
</template>

<style scoped>
.page-content {
  padding-top: 140px;
  padding-bottom: 170px;
}
</style>
