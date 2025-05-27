<!-- Best Product 섹션 -->
<template>
    <section id="Best Product" class="section">
        <div class="section3 wrap flex">
            <h2 class="h2">Best Product</h2>
            <div class="product_d wrap flex">
                <ul class="flex">
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
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProducts, allProducts } from '@/composables/useProducts'

const { products, toggleLike } = useProducts()

// ✅ 정의 안 돼 있던 visibleProducts를 여기서 선언!
const visibleProducts = computed(() => products.value.slice(0, 5))

// id 기준으로 좋아요 토글
function toggleLikeById(id) {
  const idx = products.value.findIndex(p => p.id === id)
  if (idx !== -1) toggleLike(idx)
}
</script>


<style scoped>
section {
    /* height: 100%; */
}
.section3 {
    display: flex;
    flex-direction: column;
    /* background-color: #ccc; */
}
.section3 h2 {
    color: #d1707a;
    margin-bottom: 33px;
}

.product_d {
    justify-content: center;
}
.product_d ul {
    width: 1440px;
    display: flex;
    justify-content: space-between;
}
.product_d ul li {
    position: relative;
}
.product_d ul li img {
    width: 218px;
    height: 218px;
    object-fit: cover;
    border: 1px solid #a0a0a0;
}
.product_d ul li p {
    color: #2f2929;
}
.product_d ul li:nth-child(1)::after,
.product_d ul li:nth-child(2)::after,
.product_d ul li:nth-child(3)::after  {
    position: absolute;
    top: 0;
    left: 0;
    width: 44px;
    height: 50px;
    content: '';
    background-image: url('@/assets/svg/ribbon.svg');
    background-repeat: no-repeat;
    background-size: contain;
    color: white;
    font-weight: bold;
    text-align: center;
    font-size: 16px;
    line-height: 44px;
}
.product_d ul li:nth-child(1)::after {
    content: '1';
}
.product_d ul li:nth-child(2)::after {
    content: '2';
}
.product_d ul li:nth-child(3)::after {
    content: '3';
}

</style>