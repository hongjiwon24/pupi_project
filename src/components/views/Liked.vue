<!-- Liked.vue -->
<template>
  <div class="like wrap flex-column-center">
    <h2>찜한 상품</h2>
    <ul class="product-list">
      <li v-for="item in likedProducts" :key="item.id">
        <router-link :to="item.link">
          <img :src="item.image" :alt="item.name" />
          <p>{{ item.name }}<br><strong>{{ item.price.toLocaleString() }}원</strong></p>
        </router-link>
        <button class="like-btn" @click="toggleLike(item.id)">
          <span :class="['heart', item.liked ? 'on' : '']">
            {{ item.liked ? '❤️' : '🤍' }}
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useProducts } from '@/composables/useProducts'

const { likedProducts, toggleLike } = useProducts()
</script>


<style scoped>

.like {
  min-height: 700px;
  margin-bottom: 90px;
  margin-top: 70px;
  justify-content: normal;
}

.like h2 {
  text-align: center;
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 30px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr)); /* 줄당 5개 */
  gap: 58px 32px;
}

.product-list li {
  position: relative;
}

.product-list li img {
  width: 216px;
  height: 216px;
  object-fit: cover;
  border: 1px solid #a0a0a0;
}

.product-list li p {
  color: #5e5e5e;
  font-size: 15px;
}

</style>