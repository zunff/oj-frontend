<template>
  <div id="userInfoView">
    <a-card hoverable :style="{ width: '360px' }" v-if="userInfo">
      <template #cover>
        <div
          :style="{
            height: '204px',
            overflow: 'hidden',
          }"
        >
          <img
            :style="{ width: '100%', transform: 'translateY(-20px)' }"
            alt="dessert"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
          />
        </div>
      </template>
      <a-card-meta :title="userInfo.userName">
        <template #description>
          AccessKey: {{ userInfo.accessKey }}
          <br />
          SecretKey: {{ userInfo.secretKey }}
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { UserControllerService, UserVO } from "../../../generated/user";
import message from "@arco-design/web-vue/es/message";
import { ref, defineProps, withDefaults, onMounted } from "vue";
import { useStore } from "vuex";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const store = useStore();

const userInfo = ref<UserVO>();

const loadData = async () => {
  const res = await UserControllerService.getUserVoByIdUsingGet(
    props.id as any
  );
  if (res.code == 0) {
    userInfo.value = res.data;
  } else {
    message.error("获取题目列表失败，" + res.message);
  }
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
#userInfoView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
