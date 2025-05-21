<template>
  <div class="card" :class="{ flipped, disabled }" @click="flipCard">
    <div class="card-inner">
      <!-- 앞면: 고정 이미지 -->
      <div class="card-front">
        <img :src="frontImage" alt="카드 앞면 이미지" />
      </div>

      <!-- 뒷면: 무작위로 선택된 이미지 -->
      <div class="card-back">
        <img v-if="backImage" :src="backImage" alt="뒷면 상품 이미지" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'


// 고정된 카드 앞면 이미지 (예: 랜덤 카드 디자인)
const frontImage = new URL('@/assets/svg/card/random_card.svg', import.meta.url).href

// 뒷면 이미지 후보 리스트
const backImages = [
  new URL('@/assets/svg/card/10_cupon_card.svg', import.meta.url).href,
  new URL('@/assets/svg/card/b_animal_card.svg', import.meta.url).href,
  new URL('@/assets/svg/card/b_food_card.svg', import.meta.url).href,
  new URL('@/assets/svg/card/baby_set_card.svg', import.meta.url).href,
  new URL('@/assets/svg/card/free_cupon_card.svg', import.meta.url).href,
  new URL('@/assets/svg/card/next_time_card.svg', import.meta.url).href,
]

const props = defineProps({
  disabled: Boolean,
})

const emit = defineEmits(['flipped'])

const flipped = ref(false)
const backImage = ref(null)

// 카드 클릭 시
const flipCard = () => {
  if (flipped.value || props.disabled) return
  flipped.value = true
  emit('flipped')
}

// 컴포넌트가 마운트될 때 무작위 이미지 선택
onMounted(() => {
  const randomIndex = Math.floor(Math.random() * backImages.length)
  backImage.value = backImages[randomIndex]
})
</script>



<style scoped>
.card {
  width: 184px;
  height: 250px;
  perspective: 1000px;
  cursor: pointer;
  transition: 0.17s ease-out;
}
.card:hover { /* 카드 호버 */
  scale: 1.04;
  transition: 0.17s ease-out;
}
.card.disabled {
  pointer-events: none;
}

.card-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  position: relative;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  border: 2.5px solid #6e4739;
}

.card-front {
  background-color: #f2f2f2;
}
.card-front img {
  object-fit: cover;
  width: 100%;
}

.card-back {
  background-color: #ffe600;
  transform: rotateY(180deg);
  font-weight: bold;
}
</style>
