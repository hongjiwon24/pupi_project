<template>
  <div class="login-container">
    <div class="login-box flex-column">
      <h2 class="login-title">LOGIN</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <!-- <label for="username">아이디를 입력하세요</label> -->
          <input
            v-model="username"
            id="username"
            type="text"
            required
            placeholder="아이디를 입력하세요"
          />
        </div>

        <div class="form-group">
          <!-- <label for="password">비밀번호를 입력하세요</label> -->
          <input
            v-model="password"
            id="password"
            type="password"
            required
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <button type="submit" class="login-button">Login</button>

        <div class="signup-link">
          아직 아이디가 없으신가요?
          <router-link to="/signup" class="link">회원가입</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('아이디:', username.value)
  console.log('비밀번호:', password.value)

  // 로그인 로직 또는 API 연동 작성 위치
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  min-height: 700px;
  margin-bottom: 90px;
  margin-top: 50px;
}
.login-box {
  width: 100%;
  max-width: 400px;
  padding: 50px 43px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #939393;
  align-items: center;
  gap: 24px;
}
.login-box form {
  width: 85%;
}

.login-title {
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  color: #FF8181;
  margin-bottom: 18px;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px 0;
  border: 1px solid rgba(0,0,0,0);
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border 0.2s ease;
  background-color: #E5E5E5;
}

.form-group input:focus {
  border-color: #3b82f6;
}

input::placeholder { /* 아이디, 비밀번호 입력칸  */
  color: #AFAFAF;
  font-weight: bold;
  padding-left: 20px;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #FF8181;
  color: white;
  font-weight: 600;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-button:hover {
  background-color: #e86565;
}

/* 회원가입 링크 */
.signup-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #999;
}

.signup-link .link {
  color: #444;
  font-weight: bold;
  margin-left: 6px;
  text-decoration: none;
  cursor: pointer;
  color: #606060 !important;
}

.signup-link .link:hover {
  text-decoration: underline;
}

</style>
