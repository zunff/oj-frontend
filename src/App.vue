<template>
  <div id="app">
    <LoadingOverlay :isLoading="isLoading" />
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { getCurrentUser } from "@/api";

const route = useRoute();

const store = useStore();

const isLoading = computed(() => store.state.loading);

/**
 *全局初始化函数，有全局单次调用的代码，都可以写到这里
 */
const doInit = async () => {
  console.log("OJ判题，Create By ZunF@2023");
  initLoginUser();
};

const initLoginUser = async () => {
  const token = localStorage.getItem("user_login_token");
  const user = store.state.user;
  if (token) {
    if (!user || !user.loginUser) {
      try {
        const res = await getCurrentUser();
        store.commit("user/updateUser", res.data);
      } catch (e) {
        localStorage.removeItem("user_login_token");
        store.state.user.loginUser = undefined;
      }
    }
  }
};

onMounted(() => {
  doInit();
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: transparent;
}

#app {
}
</style>
