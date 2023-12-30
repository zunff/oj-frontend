<template>
  <div id="globalHeader">
    <a-row align="center" :wrap="false">
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selected-keys="selectKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div
              :style="{
                width: '50px',
                height: '50px',
                borderRadius: '2px',
                background: 'var(--color-fill-3)',
                cursor: 'text',
              }"
            >
              <img
                style="height: 100%; width: 100%"
                src="../assets/sheep.png"
              />
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="150px">
        <a-dropdown-button>
          {{ store.state.user?.loginUser?.userName ?? "未登录" }}
          <template #icon>
            <icon-down />
          </template>
          <template #content>
            <a-doption style="padding: 0 15px">
              <div
                v-if="store.state.user?.loginUser?.userName"
                @click="handleLogout"
              >
                <icon-import />
                退出登陆
              </div>
              <div v-else @click="handleLogin">
                <icon-export />
                立即登陆
              </div>
            </a-doption>
          </template>
        </a-dropdown-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import {
  IconDown,
  IconImport,
  IconExport,
  IconHome,
} from "@arco-design/web-vue/es/icon";
import { routes } from "@/router/routes";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import "@/access";
import { UserControllerService } from "../../generated/user";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();
const selectKeys = ref(["/"]);
const store = useStore();
//展示在菜单的路由
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (!checkAccess(store.state.user.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

router.afterEach((to, form, failure) => {
  selectKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// setTimeout(() => {
//   store.dispatch("user/getLoginUser");
// }, 3000);

const handleLogin = () => {
  router.push("/user/login");
};

const handleLogout = async () => {
  const data = await UserControllerService.userLogoutUsingPost();
  if (data.data) {
    message.success("退出登陆成功");
    store.state.user.loginUser = undefined;
  } else {
    message.error("退出登陆失败，" + data.message);
  }
};
</script>

<style scoped></style>
