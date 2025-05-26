<template>
  <transition name="fade">
    <div v-if="isVisible && isHomePage" class="popup-overlay" @click.self="closePopup">
      <div class="popup-content">
        <button class="close-btn" @click="closePopup">×</button>
        <h2><strong>랜덤 카드 뽑기 이벤트</strong></h2>
        <p>이벤트 참여하고 상품을 받아가세요 <br>다양한 경품들이 무료로 쏟아져요!</p>
        <img src="@/assets/svg/card/random_card.svg" alt="랜덤 카드 이미지" class="random-card">

        <!-- router-link를 button처럼 -->
        <router-link to="/goevent" class="event-btn">이벤트 보러가기</router-link>

        <button class="disable-popup-btn" @click="disableTodayPopup">오늘 하루 열지 않기 ×</button>
      </div>
    </div>
  </transition>
</template>


<!-- 로컬스토리지에 저장된 팝업 기록 삭제 -->
<!-- localStorage.removeItem('popupClosed'); -->

<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const isHomePage = ref(false)


// 오늘 하루 열지 않기
onMounted(() => {
  const path = window.location.pathname

  if (
    path === '/' ||
    path === '/index.html' ||
    path === '/pupi/' ||
    path === '/pupi/index.html'
  ) {
    isHomePage.value = true

    const today = new Date().toISOString().split('T')[0]
    const popupClosedDate = localStorage.getItem('popupClosedDate')

    if (popupClosedDate !== today) {
      isVisible.value = true
    }
  }
})

const closePopup = () => {
  isVisible.value = false
}

const disableTodayPopup = () => {
  const today = new Date().toISOString().split('T')[0]
  localStorage.setItem('popupClosedDate', today)
  isVisible.value = false
}
</script>


<style scoped>
.random-card { /* 카드 이미지 */
  width: 105px;
  margin: 30px;
  border: 2px solid #764f41;
  border-radius: 5px;
}
.popup-content h2 { /* 랜덤 카드 뽑기 이벤트 */
  font-size: 24px;
  margin-bottom: 10px;
}
.popup-content p { /* 카드를 뒤집고 상품 받아가세요! */
  font-size: 15px;
  color: #818181;
}

.popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-content {
  background: white;
  padding: 32px 25px;
  border-radius: 12px;
  min-width: 300px;
  max-width: 500px;
  height: 400px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.close-btn {
  position: absolute;
  top: 10px; right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

/* 이벤트 보러가기 */
.event-btn {
  padding: 10px 20px;
  background-color: #ff6b6b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 154px;
  color: white !important;
  margin-bottom: 15px;
}

.event-btn:hover {
  background-color: #e64b4b;
}

/* 오늘 하루 열지 않기 */ 
.disable-popup-btn {
  border: none;
  cursor: pointer;
  font-weight: bold;
  background-color: white;
  position: absolute;
  right: 22px;
  bottom: 22px;
  color: #686868;
}


</style>
