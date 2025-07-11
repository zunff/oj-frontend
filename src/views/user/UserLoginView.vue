<template>
  <div class="login-container">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>
    <!-- 登录卡片 -->
    <div class="login-card">
      <div class="login-header">
        <div class="logo-container">
          <img src="/logo.svg" alt="logo" class="logo-img" />
          <h1 class="app-title">OJ Platform</h1>
          <p class="app-subtitle">在线判题系统</p>
        </div>
      </div>
      <el-form
        :model="form"
        @submit.prevent="handleSubmit"
        class="login-form"
        label-position="top"
      >
        <el-form-item label="账号" prop="userAccount">
          <el-input
            v-model="form.userAccount"
            placeholder="请输入您的账号"
            size="large"
            :prefix-icon="User"
            class="custom-input"
          />
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input
            v-model="form.userPassword"
            type="password"
            placeholder="请输入您的密码"
            show-password
            size="large"
            :prefix-icon="Lock"
            class="custom-input"
          />
          <template #tip>
            <span class="password-tip">密码长度不少于8位</span>
          </template>
        </el-form-item>
        <el-form-item class="submit-section">
          <el-button
            type="primary"
            @click="handleSubmit"
            class="login-btn"
            size="large"
            :loading="loading"
          >
            {{ loading ? "登录中..." : "登录" }}
          </el-button>
        </el-form-item>
        <div class="register-section">
          <span class="register-text">还没有账号？</span>
          <el-button @click="register" text class="register-btn">
            立即注册
          </el-button>
        </div>
      </el-form>
      <!-- 快速登录提示 -->
      <div class="demo-tip">
        <el-icon><InfoFilled /></el-icon>
        <span>演示账号：zunf / 12345678</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { userLogin, getCurrentUser, type UserLoginRequest } from "@/api";
import { ElMessage, ElNotification } from "element-plus";
import { User, Lock, InfoFilled } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const form: UserLoginRequest = reactive({
  userAccount: "",
  userPassword: "",
});

const store = useStore();
const router = useRouter();
const loading = ref(false);

const handleSubmit = async () => {
  if (!form.userAccount || !form.userPassword) {
    ElMessage.warning("请填写完整的登录信息");
    return;
  }
  loading.value = true;
  try {
    const res = await userLogin(form);
    localStorage.setItem("user_login_token", res.data);
    const userRes = await getCurrentUser();
    localStorage.setItem("user_login_info", JSON.stringify(userRes.data ?? {}));
    store.commit("user/updateUser", userRes.data);
    router.push({
      path: "/",
      replace: true,
    });
    ElMessage.success("登录成功，欢迎回来！");
  } catch (error) {
    ElMessage.error("登录失败，请检查账号密码");
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const register = () => {
  router.push("/user/register");
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  position: relative;
  overflow: hidden;
}

.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  animation: float 6s ease-in-out infinite;
}
.shape-1 {
  width: 100px;
  height: 100px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}
.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}
.shape-3 {
  width: 80px;
  height: 80px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}
.login-card {
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.1);
  width: 100%;
  max-width: 420px;
  position: relative;
  z-index: 1;
  animation: slideIn 0.6s ease-out;
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.login-header {
  text-align: center;
  margin-bottom: 30px;
}
.logo-container {
  margin-bottom: 20px;
}
.logo-img {
  width: 60px;
  height: 60px;
  margin: 0 auto 15px;
  display: block;
}
.app-title {
  font-size: 28px;
  font-weight: 700;
  color: #2563eb;
  margin: 0 0 5px;
  letter-spacing: 1px;
}
.app-subtitle {
  font-size: 14px;
  color: #60a5fa;
  margin: 0;
}
.login-form {
  margin-top: 30px;
}
.custom-input :deep(.el-input__wrapper) {
  border-radius: 12px;
  border: 2px solid #e1e8ed;
  transition: all 0.3s ease;
  background: #f8f9fa;
}
.custom-input :deep(.el-input__wrapper:hover) {
  border-color: #3b82f6;
  background: white;
}
.custom-input :deep(.el-input__wrapper.is-focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background: white;
}
.custom-input :deep(.el-input__inner) {
  font-size: 16px;
  padding: 12px 16px;
}
.submit-section {
  margin-top: 30px;
}
.login-btn {
  width: 100%;
  height: 50px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
  border: none;
  color: #fff;
  transition: all 0.3s ease;
}
.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.15);
}
.register-section {
  text-align: center;
  margin-top: 20px;
}
.register-text {
  color: #7f8c8d;
  font-size: 14px;
}
.register-btn {
  color: #3b82f6;
  font-weight: 600;
  margin-left: 5px;
}
.register-btn:hover {
  color: #2563eb;
}
.password-tip {
  font-size: 12px;
  color: #60a5fa;
}
.demo-tip {
  margin-top: 20px;
  padding: 12px 16px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 8px;
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: center;
  justify-content: center;
}
.demo-tip .el-icon {
  font-size: 14px;
}
@media (max-width: 480px) {
  .login-card {
    margin: 20px;
    padding: 30px 25px;
  }
  .app-title {
    font-size: 24px;
  }
  .logo-img {
    width: 50px;
    height: 50px;
  }
}
</style>
