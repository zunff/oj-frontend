<template>
  <div id="globalHeader">
    <el-row align="middle" :gutter="0">
      <el-col :span="18">
        <el-menu
          mode="horizontal"
          :default-active="activeIndex"
          @select="doMenuClick"
          class="header-menu"
        >
          <el-menu-item index="logo" disabled class="logo-item">
            <div class="logo-container">
              <img class="logo-image" src="../assets/sheep.png" alt="Logo" />
            </div>
          </el-menu-item>
          <el-menu-item
            v-for="item in visibleRoutes"
            :key="item.path"
            :index="item.path"
          >
            {{ item.name }}
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="6" class="user-section">
        <el-dropdown @command="handleCommand">
          <span class="user-dropdown">
            {{ store.state.user?.loginUser?.userName ?? "未登录" }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-if="store.state.user?.loginUser?.userName"
                command="logout"
              >
                <el-icon><switch-button /></el-icon>
                退出登录
              </el-dropdown-item>
              <el-dropdown-item v-else command="login">
                <el-icon><user /></el-icon>
                立即登录
              </el-dropdown-item>
              <el-dropdown-item command="apiList">
                <el-icon><connection /></el-icon>
                Api开放平台
              </el-dropdown-item>
              <el-dropdown-item command="userInfo">
                <el-icon><user /></el-icon>
                个人信息
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowDown,
  SwitchButton,
  User,
  Connection,
} from "@element-plus/icons-vue";
import { routes } from "@/router/routes";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import "@/access";
import { userLogout } from "@/api";
import { ElMessage } from "element-plus";

const router = useRouter();
const activeIndex = ref("/");
const store = useStore();

// 展示在菜单的路由
const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (!checkAccess(store.state.user.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

router.afterEach((to) => {
  activeIndex.value = to.path;
});

const doMenuClick = (key: string) => {
  if (key !== "logo") {
    router.push({
      path: key,
    });
  }
};

const handleCommand = async (command: string) => {
  switch (command) {
    case "login":
      router.push("/user/login");
      break;
    case "logout":
      try {
        const res = await userLogout();
        if (res.data) {
          ElMessage.success("退出登录成功");
          // 清除token
          localStorage.removeItem("user_login_token");
          store.state.user.loginUser = undefined;
        } else {
          ElMessage.error("退出登录失败，" + res.message);
        }
      } catch (error) {
        ElMessage.error("退出登录失败");
      }
      break;
    case "apiList":
      router.push("/list/api");
      break;
    case "userInfo":
      router.push({
        path: `/info/user/${store.state.user.loginUser?.id}`,
      });
      break;
  }
};
</script>

<style scoped>
#globalHeader {
  padding: 0 20px;
}

.header-menu {
  border-bottom: none;
}

.logo-item {
  padding: 0 !important;
  margin-right: 38px;
  cursor: default;
}

.logo-container {
  width: 50px;
  height: 50px;
  border-radius: 2px;
  background: var(--el-fill-color-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.user-section {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.user-dropdown {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--el-text-color-primary);
}

.user-dropdown:hover {
  color: var(--el-color-primary);
}
</style>
