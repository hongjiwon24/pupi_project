// useProducts.js
import { ref, computed, onMounted, watch } from 'vue'

// 1. 로컬스토리지 키
const LOCAL_KEY = 'pupi-liked-products'

// 2. 모든 상품 한꺼번에 정리 (여기서 이미지 import도 같이 해야 함)
import b_animal from '@/assets/img/b_animal.png'
import elpnt from '@/assets/img/elpnt.png' // Animal 인형 사진
import cat_w from '@/assets/img/cat_w.png'
import bear from '@/assets/img/bear.png'
import dog_w from '@/assets/img/dog_w.png'
import rabbit from '@/assets/img/rabbit.png'
import dog_b from '@/assets/img/dog_b.png'
import corn from '@/assets/img/corn.png' // Food 인형 사진
import tomato from '@/assets/img/tomato.png'
import peach from '@/assets/img/peach.png'
import potato from '@/assets/img/potato.png'
import st_milk from '@/assets/img/st_milk.png'

export const allProducts = [ // 이름, 가격, 카테고리, 이미지, 좋아요
  // 꾸러미 상품
  {
    id: 'baby_set001',
    name: 'Baby Animal 꾸러미',
    price: 52000,
    image: b_animal,
    category: 'animal',
    liked: false,
    link: '/product/baby_set001',
    description: '우리 아이를 위한 첫 인형, 베이비 애니멀 꾸러미 세트를 선물해주세요. 알러지, 진드기 걱정 없는 순면 100%로 제작되었습니다.'
    },
  //  Animal 카테고리
  {
    id: 'animal001',
    name: 'Baby Elephant',
    price: 20000,
    category: 'animal',
    image: elpnt,
    liked: false,
    link: '/product/animal001',
    description: '귀여운 코끼리 인형으로, 부드러운 촉감이 특징입니다.'
  },
  {
    id: 'animal002',
    name: 'Baby Cat',
    price: 20000,
    category: 'animal',
    image: cat_w,
    liked: false,
    link: '/product/animal002',
    description: '하얀 고양이 인형으로, 포근한 느낌을 선사해요.'
  },
  {
    id: 'animal003',
    name: 'Baby Dog (White)',
    price: 20000,
    category: 'animal',
    image: dog_w,
    liked: false,
    link: '/product/animal003',
    description: '순둥순둥한 흰 강아지 인형입니다.'
  },
  {
    id: 'animal004',
    name: 'Baby Bear',
    price: 20000,
    category: 'animal',
    image: bear,
    liked: false,
    link: '/product/animal004',
    description: '포근한 털의 곰돌이 인형입니다.'
  },
  {
    id: 'animal005',
    name: 'Baby Rabbit',
    price: 20000,
    category: 'animal',
    image: rabbit,
    liked: false,
    link: '/product/animal005',
    description: '길쭉한 귀가 매력적인 토끼 인형입니다.'
  },
  {
    id: 'animal006',
    name: 'Baby Dog (Brown)',
    price: 20000,
    category: 'animal',
    image: dog_b,
    liked: false,
    link: '/product/animal006',
    description: '갈색 강아지 인형으로 따뜻한 느낌을 줍니다.'
  },

  // Food 카테고리
  {
    id: 'food001',
    name: 'Baby Corn',
    price: 20000,
    category: 'food',
    image: corn,
    liked: false,
    link: '/product/food001',
    description: '노란 색감의 귀여운 옥수수 인형입니다.'
  },
  {
    id: 'food002',
    name: 'Baby Tomato',
    price: 20000,
    category: 'food',
    image: tomato,
    liked: false,
    link: '/product/food002',
    description: '빨간 토마토 인형으로 생기 있는 분위기를 줍니다.'
  },
  {
    id: 'food003',
    name: 'Baby Peach',
    price: 20000,
    category: 'food',
    image: peach,
    liked: false,
    link: '/product/food003',
    description: '복숭아 모양의 인형으로 달콤한 느낌을 선사합니다.'
  },
  {
    id: 'food004',
    name: 'Baby Potato',
    price: 20000,
    category: 'food',
    image: potato,
    liked: false,
    link: '/product/food004',
    description: '귀여운 감자 모양 인형이에요.'
  },
  {
    id: 'food005',
    name: 'Strawberry Milk',
    price: 20000,
    category: 'food',
    image: st_milk,
    liked: false,
    link: '/product/food005',
    description: '딸기우유 모양의 인형으로 보기만 해도 달콤해요.'
  }
]


// composables/useProducts.js
// import { ref, computed, onMounted, watch } from 'vue'

// const LOCAL_KEY = 'pupi-liked-products'


// 전역 상태
const products = ref(null) // 초기 null
let initialized = false

export function useProducts() {
  // 한 번만 초기화
  if (!initialized) {
    products.value = [...allProducts]
    initialized = true

    // 로컬스토리지에서 찜 상태 불러오기
    const stored = localStorage.getItem(LOCAL_KEY)
    if (stored) {
      const likedList = JSON.parse(stored)
      products.value.forEach((item, i) => {
        item.liked = likedList[i] || false
      })
    }
    // 찜 상태 변경 시 저장
    watch(products, (newVal) => {
      const likedList = newVal.map(p => p.liked)
      localStorage.setItem(LOCAL_KEY, JSON.stringify(likedList))
    }, { deep: true })
  }

  // 찜 상태 토글
  const toggleLike = (index) => {
    if (products.value && products.value[index]) {
      products.value[index].liked = !products.value[index].liked
    }
  }

  // 찜한 상품만 필터링
  const likedProducts = computed(() => {
    return Array.isArray(products.value)
      ? products.value.filter(p => p.liked)
      : []
  })

  return {
    products,
    toggleLike,
    likedProducts
  }
}