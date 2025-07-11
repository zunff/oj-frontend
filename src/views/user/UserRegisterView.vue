<template>
  <div class="register-container">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>
    <!-- 注册卡片 -->
    <div class="register-card">
      <div class="register-header">
        <div class="logo-container">
          <img src="/logo.svg" alt="logo" class="logo-img" />
          <h1 class="app-title">OJ Platform</h1>
          <p class="app-subtitle">创建您的账户</p>
        </div>
      </div>
      <el-form
        :model="form"
        label-position="top"
        @submit.prevent="onSubmit"
        class="register-form"
      >
        <el-form-item label="昵称" prop="userName">
          <el-input
            v-model="form.userName"
            placeholder="请输入您的昵称"
            size="large"
            :prefix-icon="User"
            class="custom-input"
          />
        </el-form-item>
        <el-form-item label="账号" prop="userAccount">
          <el-input
            v-model="form.userAccount"
            placeholder="请输入您的账号"
            size="large"
            :prefix-icon="UserFilled"
            class="custom-input"
          />
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input
            v-model="form.userPassword"
            type="password"
            show-password
            placeholder="请输入您的密码"
            size="large"
            :prefix-icon="Lock"
            class="custom-input"
          />
          <template #tip>
            <span class="password-tip">密码长度不少于8位</span>
          </template>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input
            v-model="form.checkPassword"
            type="password"
            show-password
            placeholder="请再次输入密码"
            size="large"
            :prefix-icon="Lock"
            class="custom-input"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="form.email"
            placeholder="请输入您的邮箱"
            size="large"
            :prefix-icon="Message"
            class="custom-input"
          />
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <div class="captcha-container">
            <el-input
              v-model="form.captcha"
              placeholder="请输入验证码"
              size="large"
              :prefix-icon="Key"
              class="custom-input captcha-input"
            />
            <el-button
              :type="isSending ? 'info' : 'primary'"
              :disabled="isSending"
              @click="sendCaptcha"
              class="captcha-btn"
              size="large"
            >
              {{ isSending ? `重新发送(${countdown})` : "发送验证码" }}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item class="submit-section">
          <el-button
            type="primary"
            @click="onSubmit"
            class="register-btn"
            size="large"
            :loading="loading"
          >
            {{ loading ? "注册中..." : "注册" }}
          </el-button>
        </el-form-item>
        <div class="login-section">
          <span class="login-text">已有账号？</span>
          <el-button @click="onCancel" text class="login-btn">
            立即登录
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  userRegister,
  sendEmailCaptcha,
  type UserRegisterRequest,
} from "@/api";
import { onUnmounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { User, UserFilled, Lock, Message, Key } from "@element-plus/icons-vue";

const router = useRouter();
const loading = ref(false);

const form = reactive({
  userName: "",
  userAccount: "",
  userPassword: "",
  checkPassword: "",
  email: "",
  captcha: "",
} as UserRegisterRequest);

const onSubmit = async () => {
  if (
    !form.userName ||
    !form.userAccount ||
    !form.userPassword ||
    !form.checkPassword ||
    !form.email ||
    !form.captcha
  ) {
    ElMessage.warning("请填写完整的注册信息");
    return;
  }
  if (form.userPassword !== form.checkPassword) {
    ElMessage.error("两次输入的密码不一致");
    return;
  }
  if (form.userPassword.length < 8) {
    ElMessage.error("密码长度不能少于8位");
    return;
  }
  loading.value = true;
  try {
    const res = await userRegister(form);
    router.push({
      path: "/user/login",
      replace: true,
    });
    ElMessage.success("注册成功，请登录您的账户");
  } catch (error) {
    ElMessage.error("注册失败，请检查信息后重试");
  } finally {
    loading.value = false;
  }
};

const onCancel = () => {
  router.push({
    path: "/user/login",
    replace: true,
  });
};

const isSending = ref(false);
const countdown = ref(0);
let intervalId: any;
const cancelCountdown = () => {
  if (countdown.value > 0) {
    clearInterval(intervalId);
  }
};
const sendCaptcha = async () => {
  if (isSending.value) return;
  if (!form.email) {
    ElMessage.error("请先输入邮箱地址");
    return;
  }
  try {
    await sendEmailCaptcha(form.email);
    ElMessage.success("验证码已发送，请前往邮箱查看");
    isSending.value = true;
    countdown.value = 60;
    intervalId = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--;
      } else {
        cancelCountdown();
        isSending.value = false;
      }
    }, 1000);
  } catch (error) {
    ElMessage.error("发送邮箱失败");
    console.log(error);
  }
};
onUnmounted(cancelCountdown);
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
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
.register-card {
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.1);
  width: 100%;
  max-width: 480px;
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
.register-header {
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
.register-form {
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
.captcha-container {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}
.captcha-input {
  flex: 1;
}
.captcha-btn {
  white-space: nowrap;
  border-radius: 12px;
  height: 50px;
}
.submit-section {
  margin-top: 30px;
}
.register-btn {
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
.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.15);
}
.login-section {
  text-align: center;
  margin-top: 20px;
}
.login-text {
  color: #7f8c8d;
  font-size: 14px;
}
.login-btn {
  color: #3b82f6;
  font-weight: 600;
  margin-left: 5px;
}
.login-btn:hover {
  color: #2563eb;
}
.password-tip {
  font-size: 12px;
  color: #60a5fa;
}
@media (max-width: 480px) {
  .register-card {
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
  .captcha-container {
    flex-direction: column;
    gap: 8px;
  }
  .captcha-btn {
    width: 100%;
  }
}
</style>
