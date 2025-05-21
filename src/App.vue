<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import Popup from '@/components/common/Popup.vue'
import Header from '@/components/layout/Header.vue'
import Title from '@/components/views/Title.vue'
import CategorySection from '@/components/views/CategorySection.vue'
import Section1 from '@/components/views/Section1.vue'
import Section2 from '@/components/views/Section2.vue'
import Section3 from '@/components/views/Section3.vue'
import Footer from '@/components/layout/Footer.vue'
import Aside from '@/components/layout/Aside.vue'

import '@/assets/reset.css'
import '@/assets/style.css'

const route = useRoute()

const fullScreenRoutes = ['/all', '/baby_animal', '/baby_food', '/brand', '/event', '/goevent', '/liked', '/cart', '/login', '/not_found']  // 단독으로 보여줄 경로
// ⭐️ 경로를 computed로!
const routePath = computed(() => route.path)

// ⭐️ computed에서 최신값 사용!
const isFullScreen = computed(() =>
  fullScreenRoutes.includes(routePath.value) || routePath.value.startsWith('/product')
)


</script>


<template>

  <!-- 이벤트 페이지는 전체화면 단독 출력 -->
  <template v-if="isFullScreen">
    <Header />

    <!-- 애니메이션 추가된 router-view -->
    <!-- <transition name="fade" mode="out-in">
      <router-view />
    </transition> -->
    <router-view />

    <Footer />
    <Aside />
  </template>

  <!-- 일반 페이지는 공통 컴포넌트 + 해당 페이지 -->
  <template v-else>
    <Header />
    <Title />
    <CategorySection />
    <Section2 />
    <Section1 />
    <Section3 />
    <Footer /> 

    <!-- Aside -->
    <Aside />
    <!-- 팝업 추가 (페이지 내용과는 별개로 화면에 뜸) -->
    <Popup />
  </template>
</template>




<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
