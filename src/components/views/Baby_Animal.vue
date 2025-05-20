<!-- Baby Animal 제품 페이지 -->

<template>
  <div class="baby_animal wrap flex-column-center">
    <h2 class="h2">Baby Animal</h2>
    <ul class="product-list">
      <li v-for="(item, index) in visibleProducts" :key="item.name">
        <router-link :to="`/product/${item.id}`">
          <img :src="item.image" :alt="item.name" class="product-card" />
          <p>{{ item.name }}<strong><br>{{ item.price.toLocaleString() }}원</strong></p>
        </router-link>
        <button class="like-btn" @click="toggleLikeById(item.id)">
          <span :class="['heart', item.liked ? 'on' : '']">
            {{ item.liked ? '❤️' : '🤍' }}
          </span>
        </button>
      </li>
    </ul>
    <More_btn
    :show="visibleProducts.length < products.length"
    @click="showMore"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProducts, allProducts } from '@/composables/useProducts'
import More_btn from '@/components/common/More_btn.vue'

const { products, toggleLike } = useProducts()
const perPage = 10
const visibleCount = ref(perPage)

// 카테고리 필터링
const filteredProducts = computed(() =>
  products.value.filter(p => p.category === 'animal')
)
const visibleProducts = computed(() =>
  filteredProducts.value.slice(0, visibleCount.value)
)
const showMore = () => {
  visibleCount.value += perPage
}
function toggleLikeById(id) {
  const idx = products.value.findIndex(p => p.id === id)
  if (idx !== -1) toggleLike(idx)
}
</script>

<style scoped>
.baby_animal {
  min-height: 700px;
  margin-bottom: 90px;
  margin-top: 70px;
}
.baby_animal h2 {

}
.baby_animal ul {
    /* width: 1440px; */
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr)); /* 줄당 5개 */
    gap: 58px 32px;
}
.baby_animal ul li {
  position: relative;
}
.baby_animal ul li img {
  
}
.baby_animal ul li p {
    color: #5e5e5e;
    font-size: 15px;
}
</style>
