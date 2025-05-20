<!-- 제품 5개씩 1줄 -->

<template>
  <div class="product_l wrap flex">
    <ul class="product-list">
      <li v-for="(item, index) in products" :key="item.name"> <!-- 상품 하나씩 반복 렌더링 -->
        <router-link :to="item.link"> 
          <img :src="item.image" :alt="item.name" /> <!-- 상품 이미지 바인딩 -->
          <p>{{ item.name }}<strong><br>{{ item.price.toLocaleString() }}원</strong></p> <!-- 상품 이름 + 가격 출력 -->
        </router-link>
        <button class="like-btn" @click="toggleLike(index)"> <!-- 찜하기 버튼 -->
            <span :class="['heart', item.liked ? 'on' : '']">
              {{ item.liked ? '❤️' : '🤍' }}
            </span>
        </button>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useProducts } from '@/composables/useProducts'
import addCircle from '@/assets/svg/add_circle.svg'

const { products } = useProducts()

const toggleLike = (index) => {
  products[index].liked = !products[index].liked
}
</script>


<style scoped>

.product_l {
    justify-content: center;
    margin-top: 8px;
}
.product_l ul {
    /* width: 1440px; */
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr)); /* 줄당 5개 */
    gap: 58px 32px; /* 원하는 간격 */
}
.product_l ul li {
  position: relative;
  overflow: hidden;
}
.product_l ul li a {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
}
.product_l ul li img {
    width: 216px;
    height: 216px;
    object-fit: cover;
    border: 1px solid #a0a0a0;
    grid-column: 1 / span 2;
}
.product_l ul li p {
    color: #5e5e5e;
    font-size: 15px;
}

</style>