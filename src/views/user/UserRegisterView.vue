<template>
  <div>
    <el-form
      :model="form"
      label-position="top"
      @submit.prevent="onSubmit"
      style="max-width: 480px; margin: 40px auto"
    >
      <el-form-item label="昵称" prop="userName">
        <el-input v-model="form.userName" />
      </el-form-item>
      <el-form-item label="账号" prop="userAccount">
        <el-input v-model="form.userAccount" />
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input v-model="form.userPassword" type="password" show-password />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input v-model="form.checkPassword" type="password" show-password />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <div style="display: flex; gap: 10px">
          <el-input v-model="form.captcha" style="flex: 1" />
          <el-button
            :type="isSending ? 'info' : 'primary'"
            :disabled="isSending"
            @click="sendCaptcha"
          >
            {{ isSending ? `重新发送(${countdown})` : "发送验证码" }}
          </el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button style="margin-left: 80px" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
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

const router = useRouter();

/**
 * 表单信息
 */
const form = reactive({
  userName: "",
  userAccount: "",
  userPassword: "",
  checkPassword: "",
  email: "",
  captcha: "",
} as UserRegisterRequest);

const onSubmit = async () => {
  try {
    console.log(form);
    const res = await userRegister(form);

    // 注册成功，跳转到登录页
    router.push({
      path: "/user/login",
      replace: true,
    });
    ElMessage.success("注册成功");
  } catch (error) {
    ElMessage.error("注册失败");
  }
};

const onCancel = () => {
  router.push({
    path: "/user/login",
    replace: true,
  });
};

const isSending = ref(false); // 是否正在发送验证码
const countdown = ref(0); // 倒计时秒数

// 设置一个用于清理倒计时的函数
const cancelCountdown = () => {
  if (countdown.value > 0) {
    clearInterval(intervalId);
  }
};

let intervalId: any; // 倒计时定时器ID

const sendCaptcha = async () => {
  if (isSending.value) return; // 如果正在发送，则不执行任何操作

  if (!form.email) {
    ElMessage.error("请先输入邮箱地址");
    return;
  }

  // 发送验证码的逻辑
  try {
    await sendEmailCaptcha(form.email);
    ElMessage.success("验证码已发送，请前往邮箱查看");
    // 开始倒计时
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

// 组件卸载时清理倒计时
onUnmounted(cancelCountdown);
</script>
