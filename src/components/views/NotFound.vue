<!-- NotFound.vue -->
<template>
  <div class="NotFound wrap flex-column">
    <!-- <h2>NotFound</h2> -->
    <h2>404</h2>
    <P>이런! 페이지가 공사중이에요!</P>
    <img src="@/assets/img/fix_2.png" alt="">
    <!-- <p>이런! 페이지가 수정중이에요!</p> -->
    <button @click="goBack" class="NotFound-btn">뒤로 가기</button>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import '@/assets/img/fix_2.png'

const router = useRouter()

const goBack = () => {
  router.go(-1)  // 브라우저 히스토리 한 단계 뒤로
}
</script>

<style scoped>

.NotFound {
  height: 100vh;
  align-items: center;
  min-height: 700px;
  /* margin-bottom: 30px; */
  margin-top: 70px;
  /* gap: 60px; */
}
/* .NotFound h2 {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
} */
.NotFound h2 {
  font-size: 80px;
  font-weight: bold;
  color: #ff6b6b;
}
.NotFound img {
  width: 500px;
  height: 330px;
  margin: 60px 0 20px 0;
}
.NotFound p {
  font-size: 24px;
  font-weight: bold;
  color: #838383;
}

.NotFound-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff6b6b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 154px;
}
.NotFound-btn {
  color: white !important;
}

</style>