<!-- BABY ANIMAL 섹션 -->
<template>
  <Swiper
    :modules="[Navigation, Pagination]"
    :slides-per-view="1"
    :space-between="20"
    navigation
    pagination
    class="baby-swiper"
  >
    <SwiperSlide v-for="(section, index) in sections" :key="index">
      <section class="section drag-zone"
            @mouseenter="isDragging = true"
            @mouseleave="isDragging = false"
            @mousemove="updateMouse">
        <!-- Drag 커서 -->
        <div
        v-if="isDragging && !isInteractive"
        class="drag-cursor"
        :style="cursorStyle"
        >
        좌우로 드래그 해보세요
        </div>
        <div class="section1 wrap flex">
          <h2 class="h2">{{ section.title }}</h2>
          <img :src="section.image" :alt="section.alt" />
          <p class="p" v-html="section.description"></p>
          <router-link :to="section.link" class="btn">더보기</router-link>
          <ul class="flex">
            <li v-for="item in section.bannerItems" :key="item.alt">
              <router-link :to="item.link">
                <img :src="item.image" :alt="item.alt" />
              </router-link>
            </li>
          </ul>
        </div>
      </section>
    </SwiperSlide>
  </Swiper>
</template>


<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

// ✅ Swiper 11에서는 반드시 이 CSS 3개를 가져와야 함
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// 이미지 import (예시)
import b_animal from '@/assets/img/b_animal.png'
import b_food from '@/assets/img/b_food.png'
import elpnt from '@/assets/img/elpnt.png'
import cat_w from '@/assets/img/cat_w.png'
import dog_w from '@/assets/img/dog_w.png'
import corn from '@/assets/img/corn.png'
import tomato from '@/assets/img/tomato.png'
import peach from '@/assets/img/peach.png'
import potato from '@/assets/img/potato.png'

const sections = [
  {
    title: "Baby Animal",
    image: b_animal,
    alt: "베이비 애니멀 이미지",
    description: `베이비 애니멀과의 교감을 통해 우리 아이가 <br> 동물 친구들과 편안한 애착을 가질 수 있도록 해주세요. <br> 베이비 애니멀은 알러지 케어가 되는 순면 100%로 만들어졌습니다.`,
    link: "/baby_animal",
    bannerItems: [
        { image: elpnt, alt: "코끼리", link: "/event" },
        { image: cat_w, alt: "고양이", link: "/event" },
        { image: dog_w, alt: "강아지", link: "/event" }
    ]
  },
  {
    title: "Baby Food",
    image: b_food,
    alt: "베이비 푸드 이미지",
    description: `베이비 푸드의 교감을 통해 우리 아이가 <br> 음식 친구들과 편안한 애착을 가질 수 있도록 해주세요. <br> 베이비 푸드는 알러지 케어가 되는 순면 100%로 만들어졌습니다.`,
    link: "/baby_food",
    bannerItems: [
        { image: corn, alt: "옥수수", link: "/event" },
        { image: peach, alt: "복숭아", link: "/event" },
        { image: potato, alt: "감자", link: "/event" }
    ]
  }
]

// Drag 커서 관련 상태
const isDragging = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const isInteractive = ref(false)

const updateMouse = (e) => {
  const bounds = e.currentTarget.getBoundingClientRect()
  mouseX.value = e.clientX - bounds.left
  mouseY.value = e.clientY - bounds.top

  // 커서 아래 요소가 <a>, <button> 등 클릭 요소인지 판별
  const target = e.target
  const tag = target.tagName.toLowerCase()
  const isClickable = ['a', 'button'].includes(tag) || getComputedStyle(target).cursor === 'pointer'
  isInteractive.value = isClickable
}



const cursorStyle = computed(() => ({
  top: `${mouseY.value + 10}px`,
  left: `${mouseX.value + 10}px`
}))


</script>

<style scoped>
/* 기존 section1 스타일은 그대로 유지해도 OK */
.section1 {
  position: relative; /* Drag 커서 기준 */
  width: 100%;
  overflow: hidden;
}

.section1 {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto 1fr 1fr auto;
    width: 100vw;
    column-gap: 50px;
}
.section1 h2 {
    grid-column: 1 / span 2;
    grid-row: 1;
}
.section1 > img {
    grid-column: 1;
    grid-row: 2 / span 4;
    width: 590px;
    height: 400px;
    object-fit: cover;
}
.section1 > p {
    grid-column: 2;
    grid-row: 2;
    align-self: end;
}
.section1 a {
    grid-column: 2;
    grid-row: 3;
    margin-top: 18px;
}
.section1 ul {
    grid-column: 2;
    grid-row: 4;
    display: flex;
    /* justify-content: space-between; */
    gap: 20px;
}
.section1 ul li {
    position: relative;
    width: 155px;
    height: 155px;
    overflow: hidden;
    border: 1px solid #ccc;
}
.section1 ul li img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

/* 어두운 필터 오버레이 */
.section1 ul li::after {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  background-image: url(@/assets/svg/add_circle.svg);
  background-repeat: no-repeat;
  background-size: 40px 40px;
  background-position: center;
}

/* 마우스 오버 시 효과 */
.section1 ul li:hover {
    border: 1px solid #a1a1a1;
}
.section1 ul li:hover::after {
  opacity: 1;
}
.section1 ul li:hover img {
  transform: scale(1.05);
}

</style>



<style>
/* global style이므로 style 태그에 scoped 사용하지 마세요 */

.baby-swiper {
  position: relative;
}

/* 스와이프 버튼 */
.swiper-button-prev,
.swiper-button-next {
  color: #ff7f50;
  z-index: 10;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 30px !important; /* ✅ 이걸 꼭 줄여야 작아져요! */
}

.swiper-button-prev {
    left: 230px;
}
.swiper-button-next {
    right: 230px;
}

/* 슬라이드 도트 */
.swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal {
    position: absolute;
    bottom: 18vh; /* 화면 높이의 10% 아래에 도트 배치 */
    left: 50%;
    transform: translateX(-50%);
}
.swiper-pagination-bullet {
  background-color: #ddd;
  opacity: 1;
  margin: 0 6px;
}

.swiper-pagination-bullet-active {
  background-color: #ff7f50;
}

/* Drag 커서 스타일 - PC에서만 작동 */
@media (hover: hover) {
  .drag-cursor {
    position: absolute;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 6px 12px;
    border-radius: 20px;
    pointer-events: none;
    z-index: 9999;
    animation: wiggle 0.8s infinite ease-in-out;
    transform: translate(0, 0);
    white-space: nowrap;
    user-select: none;
  }
}

/* 애니메이션 효과 */
/* @keyframes wiggle {
  0% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(1px, -1px) rotate(-3deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
} */
</style>