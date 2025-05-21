<template>
  <div class="goevent wrap flex">
    <!-- <img src="@/assets/event_img.svg" alt=""> -->
    <router-link to="/event">카드 뽑기</router-link>
  </div>
</template>

<style scoped>
.goevent {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.goevent a {
  width: 187px;
  height: 53px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 27px;
  font-weight: bold;
  font-size: 16px;
  border: none;
  background-color: #FF7272;
  color: white !important;
}
</style>