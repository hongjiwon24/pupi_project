<template>
  <div class="event-container flex">
    <h1>🎉행운의 카드 뒤집기 이벤트🎊</h1>
    <p>카드를 한장 뒤집어주세요!</p>
    <div class="cards">
      <FlipCard
        v-for="(prize, index) in shuffledPrizes"
        :key="index"
        :prize="prize"
        :disabled="flipped"
        @flipped="flipped = true"
      />
    </div>
    <p v-if="flipped" class="message">내일 다시 도전해 보세요!</p>
  </div>
</template>

<!-- 카드 3장만 랜더링 됨 -->
<script setup>
import { ref, computed } from 'vue'
import FlipCard from '@/components/common/FlipCard.vue'


const prizes = [
  '꽝',
  '10% 할인 쿠폰',
  '무료배송 쿠폰',
  'Baby animal 랜덤 1종',
  'Baby Food 랜덤 1종',
  'Art print 랜덤 1종'
]

// 랜덤하게 3개를 선택하는 computed 속성
const shuffledPrizes = computed(() => {
  const shuffled = [...prizes].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 3)
})

const flipped = ref(false)
</script>

<style scoped>
.event-container {
  flex-direction: column;
  align-items: center;
  height: 100vh;
  text-align: center;
  padding: 2rem;
  font-family: sans-serif;
  margin-top: 120px;
}
.event-container h1 {
  font-size: 27px;
  font-weight: bold;
}
.cards {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.message {
  margin-top: 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #888;
  position: absolute; /* 화면 고정 */
  bottom: 8%; /* 하단에 고정 */
}
</style>

<!-- 카드 여러장 랜더링 됨 -->
<!-- <script setup>
import { ref, computed } from 'vue'
import FlipCard from './FlipCard.vue'

const prizes = ['꽝', '10% 할인 쿠폰', '무료배송 쿠폰', 'Baby animal 랜덤 1종', 'Baby Food 랜덤 1종', 'Art print 랜덤 1종']

// 섞기
const shuffledPrizes = computed(() => {
  return [...prizes].sort(() => Math.random() - 0.5)
})

const flipped = ref(false)
</script> -->