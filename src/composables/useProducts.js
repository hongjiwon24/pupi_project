// useProducts.js
import { ref, computed, watch } from 'vue'

// 로컬스토리지 키
const LOCAL_KEY = 'pupi-liked-products'

// 이미지 import
import b_animal from '@/assets/img/b_animal.png'
import elpnt from '@/assets/img/elpnt.png'
import cat_w from '@/assets/img/cat_w.png'
import bear from '@/assets/img/bear.png'
import dog_w from '@/assets/img/dog_w.png'
import rabbit from '@/assets/img/rabbit.png'
import dog_b from '@/assets/img/dog_b.png'
import corn from '@/assets/img/corn.png'
import tomato from '@/assets/img/tomato.png'
import peach from '@/assets/img/peach.png'
import potato from '@/assets/img/potato.png'
import st_milk from '@/assets/img/st_milk.png'

export const allProducts = [
  // 베이비 꾸러미 카테고리
  {
    id: 'baby_set001', name: 'Baby Animal 꾸러미', price: 52000, image: b_animal, category: 'animal', liked: false, link: '/product/baby_set001',
    description: '우리 아이를 위한 첫 인형, 베이비 애니멀 꾸러미 세트를 선물해주세요. 알러지, 진드기 걱정 없는 순면 100%로 제작되었습니다.'
  },

  // 베이비 애니멀 카테고리
  { id: 'animal001', name: 'Baby Elephant', price: 20000, category: 'animal', image: elpnt, liked: false, link: '/product/animal001', description: '귀여운 코끼리 인형으로, 부드러운 촉감이 특징입니다.' },
  { id: 'animal002', name: 'Baby Cat', price: 20000, category: 'animal', image: cat_w, liked: false, link: '/product/animal002', description: '하얀 고양이 인형으로, 포근한 느낌을 선사해요.' },
  { id: 'animal003', name: 'Baby Dog (White)', price: 20000, category: 'animal', image: dog_w, liked: false, link: '/product/animal003', description: '순둥순둥한 흰 강아지 인형입니다.' },
  { id: 'animal004', name: 'Baby Bear', price: 20000, category: 'animal', image: bear, liked: false, link: '/product/animal004', description: '포근한 털의 곰돌이 인형입니다.' },
  { id: 'animal005', name: 'Baby Rabbit', price: 20000, category: 'animal', image: rabbit, liked: false, link: '/product/animal005', description: '길쭉한 귀가 매력적인 토끼 인형입니다.' },
  { id: 'animal006', name: 'Baby Dog (Brown)', price: 20000, category: 'animal', image: dog_b, liked: false, link: '/product/animal006', description: '갈색 강아지 인형으로 따뜻한 느낌을 줍니다.' },
  
  // 베이비 푸드 카테고리
  { id: 'food001', name: 'Baby Corn', price: 20000, category: 'food', image: corn, liked: false, link: '/product/food001', description: '노란 색감의 귀여운 옥수수 인형입니다.' },
  { id: 'food002', name: 'Baby Tomato', price: 20000, category: 'food', image: tomato, liked: false, link: '/product/food002', description: '빨간 토마토 인형으로 생기 있는 분위기를 줍니다.' },
  { id: 'food003', name: 'Baby Peach', price: 20000, category: 'food', image: peach, liked: false, link: '/product/food003', description: '복숭아 모양의 인형으로 달콤한 느낌을 선사합니다.' },
  { id: 'food004', name: 'Baby Potato', price: 20000, category: 'food', image: potato, liked: false, link: '/product/food004', description: '귀여운 감자 모양 인형이에요.' },
  { id: 'food005', name: 'Strawberry Milk', price: 20000, category: 'food', image: st_milk, liked: false, link: '/product/food005', description: '딸기우유 모양의 인형으로 보기만 해도 달콤해요.' }
]

// 전역 상태
const products = ref([...allProducts])

// 로컬스토리지 초기화
const stored = localStorage.getItem(LOCAL_KEY)
if (stored) {
  const likedMap = JSON.parse(stored)
  products.value.forEach((item) => {
    item.liked = likedMap[item.id] || false
  })
}

// 찜 상태 변경 시 로컬스토리지에 저장
watch(products, (newVal) => {
  const likedMap = {}
  newVal.forEach((p) => {
    likedMap[p.id] = p.liked
  })
  localStorage.setItem(LOCAL_KEY, JSON.stringify(likedMap))
}, { deep: true })

// 찜 토글
const toggleLike = (id) => {
  const idx = products.value.findIndex((p) => p.id === id)
  if (idx !== -1) {
    products.value[idx].liked = !products.value[idx].liked
  }
}

// 찜된 상품만 반환
const likedProducts = computed(() =>
  products.value.filter(p => p.liked)
)

export function useProducts() {
  return {
    products,
    toggleLike,
    likedProducts
  }
}
