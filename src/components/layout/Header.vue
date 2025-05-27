<template>
    <header :class="{ shadow: hasShadow }" class="flex">
        <span class="block"></span>
        <nav class="flex">
            <!-- <img src="@/assets/img/logo.png" alt="logo"> -->
            <h1 class="h1"><router-link to="/">Pupi</router-link></h1>
            <ul class="flex">
                <li><router-link to="/all">All</router-link></li>
                <li><router-link to="/baby_animal">Baby Animal</router-link></li>
                <li><router-link to="/baby_food">Baby Food</router-link></li>
                <!-- <li><router-link to="">Art Print</router-link></li> -->
                <li><router-link to="/not_found">Brand</router-link></li>
                <li><router-link to="/goevent">Event</router-link></li>
            </ul>
            <div class="nav-links">
                <router-link to="/liked" class="nav-item liked">좋아요</router-link>
                <router-link to="/not_found" class="nav-item cart">장바구니</router-link>
                <router-link to="/login" class="nav-item login">로그인</router-link>
            </div>
        </nav>
            
    </header> 
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const hasShadow = ref(false)

function handleScroll() {
  hasShadow.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>



<style scoped>
header {
  width: 100%;
  height: 120px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #FFF9F0;
  box-shadow: none;
  position: fixed; /* ✔ 고정 아님 */
  z-index: 3;
  top: 0;
  transition: 0.3s;
}


header span {
    width: 100%;
    height: 37px;
    background-color: #FFD6D6;
}
header nav {
    width: 1440px;
    justify-content: space-between;
    align-items: last baseline;
    padding: 10px 0 0 0;
}
header nav h1 {
    display: flex;
    align-items: center;
    font-family: 'KCC-Ganpan';
    transform: translateY(2px);
}
header nav h1::before {
    content: "";
    display: block;
    width: 50px;
    height: 48px;
    background-image: url(@/assets/img/logo.png);
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 3px;
}
header nav h1 a {
    transition: 0.7s;
}
header nav ul {
    gap: 45px;
}
header nav ul li {
  
}
header nav ul li a {
  position: relative;
  font-weight: bold;
  color: #2f2929 !important;
  font-size: 17px;
  display: inline-block;
  padding-bottom: 28px;
  transition: color 0.3s ease;
}
/* 밑줄 효과 */
header nav ul li a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0%;
  height: 7px;
  background-color: #c8f1e5;
  transition: width 0.3s ease;
}

/* 마우스 올렸을 때 */
header nav ul li a:hover::after {
  width: 100%;
}

.nav-links {
    display: flex;
    gap: 20px;
    transform: translateY(4px);
}

.nav-item {
    font-size: 0;
}

.nav-item::before {
    content: "";
    display: inline-block;
    width: 26px;
    height: 26px;
    background-repeat: no-repeat;
    background-size: contain;
}

.nav-item.liked::before {
    width: 33px;
    height: 33px;
    background-image: url('@/assets/svg/favorite.svg');
    transform: translateY(-2px);
}
.nav-item.cart::before {
    width: 27px;
    height: 27px;
    background-image: url('@/assets/svg/shopping_cart.svg');
}
.nav-item.login::before {
    background-image: url('@/assets/svg/person.svg');
}
</style>

<style>
header.shadow {
  position: fixed;     /* ✔ 스크롤 내리면 고정됨 */
  top: 0;
  left: 0;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}
header.shadow h1 a {
  color: #f1b7bd;
  transition: 0.7s;
}
</style>