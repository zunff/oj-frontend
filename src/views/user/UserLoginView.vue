<template>
  <div id="userLoginView">
    <h2>用户登录</h2>
    <el-form
      :model="form"
      @submit.prevent="handleSubmit"
      label-position="left"
      label-width="auto"
      style="max-width: 480px; margin: 40px auto"
    >
      <el-form-item label="账号" prop="userAccount">
        <el-input v-model="form.userAccount" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input
          v-model="form.userPassword"
          type="password"
          placeholder="请输入密码"
          show-password
        />
        <template #tip>
          <span>密码不小于8位</span>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit" style="width: 260px">
          登录
        </el-button>
        <el-button
          style="margin-left: 40px; width: 120px"
          @click="register"
          text
        >
          立即注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { userLogin, getCurrentUser, type UserLoginRequest } from "@/api";
import { ElMessage, ElNotification } from "element-plus";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const form: UserLoginRequest = reactive({
  userAccount: "",
  userPassword: "",
});

const store = useStore();
const router = useRouter();

const handleSubmit = async () => {
  try {
    const res = await userLogin(form);
    // 保存token到localStorage
    localStorage.setItem("user_login_token", res.data);
    // 直接请求用户信息
    const userRes = await getCurrentUser();
    localStorage.setItem("user_login_info", JSON.stringify(userRes.data ?? {}));
    store.commit("user/updateUser", userRes.data);
    router.push({
      path: "/",
      replace: true,
    });
    ElMessage.success("登录成功");
  } catch (error) {
    ElMessage.error("登录失败");
    console.log(error);
  }
};

const register = () => {
  router.push("/user/register");
};

const handleNotification = () => {
  ElNotification({
    title: "🌟 Welcome to my project !!",
    message: "管理员👷 账号：zunf 密码：12345678 也可以自己注册噢💥～",
    type: "info",
    duration: 15000,
    showClose: true,
  });
};

onMounted(() => {
  handleNotification();
});
</script>

<style scoped>
#userLoginView {
  margin: 0 auto;
}
</style>
