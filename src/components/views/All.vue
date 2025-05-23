<!-- 모든 제품 페이지 -->

<template>
  <div class="all wrap flex-column-center">
    <h2 class="h2">Product</h2>
    <ul class="product-list">
      <li v-for="item in visibleProducts" :key="item.id">
        <router-link :to="`/product/${item.id}`">
          <img :src="item.image" :alt="item.name" class="product-card"/>
          <p>{{ item.name }}<br><strong>{{ item.price.toLocaleString() }}원</strong></p>
        </router-link>
        <button class="like-btn" @click="toggleLike(item.id)">
          <span :class="['heart', item.liked ? 'on' : '']">
            {{ item.liked ? '❤️' : '🤍' }}
          </span>
        </button>
      </li>
    </ul>
    <More_btn :show="visibleProducts.length < products.length" @click="showMore" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProducts } from '@/composables/useProducts'
import More_btn from '@/components/common/More_btn.vue'

const { products, toggleLike } = useProducts()

// 더보기 기능
const perPage = 10
const visibleCount = ref(perPage)

const visibleProducts = computed(() =>
  products.value.slice(0, visibleCount.value)
)

const showMore = () => {
  visibleCount.value += perPage
}
</script>



<style scoped>

.all {
  min-height: 700px;
  margin-bottom: 90px;
  margin-top: 70px;
}
.all h2 {
    /* position: sticky;
    top: 0;
    z-index: 10;
    padding: 16px 0;
    text-align: center; */
}
.all ul {
    /* width: 1440px; */
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr)); /* 줄당 5개 */
    gap: 58px 32px;
}
.all ul li {
    position: relative;
}
.all ul li img {

}

.all ul li p {
    color: #5e5e5e;
    font-size: 15px;
}

</style>