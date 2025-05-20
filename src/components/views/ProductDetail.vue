<template>
  <div v-if="product" class="product-detail wrap">
    <div class="top">
      <img :src="product.image" :alt="product.name" />
      <div class="product-meta">
        <h2>{{ product.name }}</h2>
        <p class="description gray">{{ product.description }}</p>
        <p class="price">판매가 {{ product.price.toLocaleString() }}원</p>

        <div class="quantity">
          <span class="block">주문수량</span>
          <div class="counter">
            <button @click="decrease">-</button>
            <span>{{ quantity }}</span>
            <button @click="increase">+</button>
          </div>
        </div>

        <p class="delivery gray">배송구분 <span>일반 택배 (2,500원)</span></p>
        <hr />
        <p class="total">총 상품 금액 <strong>{{ total.toLocaleString() }}원</strong></p>

        <div class="action-buttons">
        <button class="buy-now buy-btn">바로 구매하기</button>
        <button class="buy-cart shop-btn">장바구니에 담기</button>
        <button class="like-btn-p" @click="toggleLikeById(product.id)">
          <span :class="['heart', product.liked ? 'on' : '']">
            {{ product.liked ? '❤️' : '🤍' }}
          </span>
        </button>
        </div>

      </div>
    </div>
  </div>

      <div class="relation wrap">
      <hr />
      <h3>이 상품과 같이 본 상품</h3>
      <ul class="related">
        <li v-for="item in related" :key="item.id">
          <router-link :to="`/product/${item.id}`">
            <img :src="item.image" :alt="item.name" />
            <p>{{ item.name }}<br><strong>{{ item.price.toLocaleString() }}원</strong></p>
          </router-link>
        </li>
      </ul>
      <hr />
    </div>

  <div v-if="product" class="product-info wrap">
    <h2>제품 상세 이미지</h2>
    <img src="@/assets/img/dsc_img1.png" alt="">
  </div>

  <div v-else class="not-found wrap">
    <p>해당 상품을 찾을 수 없습니다.</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useProducts } from '@/composables/useProducts'
import { computed, ref } from 'vue'


const route = useRoute()
const productId = route.params.id

const { products, toggleLike } = useProducts() // 꼭 있어야 함


// 해당 상품
const product = computed(() =>
  products.value.find(p => p.id === productId)
)

// 연관 상품 (같은 카테고리, 본인 제외)
const related = computed(() =>
  products.value.filter(p => p.category === product.value?.category && p.id !== productId).slice(0, 5)
)


// 수량 증가/감소를 위한 quantity 상태와 함수
const quantity = ref(1)

const increase = () => {
  quantity.value++
}
const decrease = () => {
  if (quantity.value > 1) quantity.value--
}

// 총 상품 금액 계산 (배송비 포함)
const shippingFee = 2500
const total = computed(() =>
  product.value ? product.value.price * quantity.value + shippingFee : 0
)



// id 기준으로 좋아요 토글
function toggleLikeById(id) {
  const idx = products.value.findIndex(p => p.id === id)
  if (idx !== -1) toggleLike(idx)
}
</script>


<style scoped>

/* ❤️ 상품 주문 */
.product-detail {
    padding: 40px 0;
    margin-top: 100px;
}
.top {
    display: flex;
    gap: 60px;
    max-width: 1100px;
    margin-bottom: 100px;
}
.top img {
    width: 608px;
    height: 388px;
    object-fit: cover;
}
.product-meta {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}
.product-meta h2 {
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 19px;
}
.product-meta .description {
  padding-bottom: 15px;
}
.related {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    margin-top: 40px;
}
.related img {
    width: 100%;
    height: 180px;
    object-fit: cover;
}
.related img:hover {
    object-fit: cover;
}

/* 판매가 */
.price {
  font-weight: bold;
}
/* 주문 수량 */
.quantity {
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
}
.counter {
  display: flex;
  align-items: center;
  gap: 8px;
}
.counter button {
  width: 32px;
  height: 32px;
  font-size: 18px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
}
.counter span {
  width: 40px;
  text-align: center;
  font-weight: bold;
}

/* 배송 구분 */
.delivery {
  font-size: 14px;
  /* margin-bottom: 12px; */
}
/* 합계 */
.total {
  font-size: 16px;
  font-weight: bold;
  text-align: end;
  padding-bottom: 20px;
}

/* 구매, 장바구니, 좋아요 버튼 */
.action-buttons {
  display: flex;
  align-items: center;
  gap: 10px; /* 버튼 간 여백 */
  margin-top: 16px; /* 전체 영역 여백 */
}

/* 구분선 */
hr {
  border: none;
  border-top: 1px solid #ddd;
  /* border-top: 1px solid #BDBDBD; */
  margin: 12px 0;
}

/* ❤️ 제품 상세 정보 */
.product-info {
  
}


/* ❤️ 찜 버튼 */
.like-btn-p {
  width: 52px;
  height: 52px;
  border: 1px solid #939393;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  padding: 0;
  margin-left: 9px;
}
.heart {
  color: #aaa; /* 기본 회색 하트 */
  font-size: 20px;
}
.heart.on {
  color: #FF7272; /* 찜한 경우 빨간 하트 */
}

/* ❤️ 404 */
.not-found {
  text-align: center;
  color: #d1707a;
  margin-top: 100px;
}
.not-found a {
  display: inline-block;
  margin-top: 18px;
  color: #888;
  text-decoration: underline;
}
</style>
