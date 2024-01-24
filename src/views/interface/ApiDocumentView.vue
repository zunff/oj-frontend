<template>
  <div id="interfaceInfoInfoView" v-if="interfaceInfoInfo">
    <a-card :title="interfaceInfoInfo.name">
      <a-descriptions style="margin-top: 20px" size="small" :column="1">
        <a-descriptions-item label="简介">
          <a-card>
            <MdViewer :value="interfaceInfoInfo.description" />
          </a-card>
        </a-descriptions-item>
        <a-descriptions-item label="访问路径">
          {{ interfaceInfoInfo.url }}
        </a-descriptions-item>
        <a-descriptions-item label="请求参数示例">
          <a-card>
            {{ JSON.parse(interfaceInfoInfo.requestParam) }}
          </a-card>
        </a-descriptions-item>
        <a-descriptions-item label="响应体示例">
          <a-card>
            {{ interfaceInfoInfo.responseBody }}
          </a-card>
        </a-descriptions-item>
        <a-descriptions-item label="请求类型">
          {{ interfaceInfoInfo.method }}
        </a-descriptions-item>
        <a-descriptions-item label="接口状态">
          <div v-if="interfaceInfoInfo.status == 0">
            <a-badge status="normal" />
            关闭
          </div>
          <div v-else>
            <a-badge status="success" />
            开启
          </div>
        </a-descriptions-item>
      </a-descriptions>
      <template #extra>
        <a-link @click="showOnlineTest">在线测试</a-link>
      </template>
    </a-card>
    <a-card v-if="isShow" style="margin-top: 20px" title="在线测试">
      <template #extra>
        剩余次数：{{ interfaceInfoInfo.leftNum }}
        <a-button
          type="outline"
          status="success"
          @click="doSubmit"
          style="margin-left: 20px"
        >
          <IconPlayArrow />
          发送
        </a-button>
      </template>

      <a-form :model="form" layout="vertical">
        <a-form-item field="name" label="请求参数">
          <div class="paramDiv">
            <CodeEditor
              :value="form.requestParam"
              :handle-change="handleJsonChange"
              language="json"
            />
          </div>
        </a-form-item>
        <a-form-item v-if="invokeResponse" field="name" label="请求响应">
          <div class="paramDiv">
            {{ invokeResponse }}
          </div>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {
  InterfaceControllerService,
  InterfaceInfoVO,
  OnlineInvokeApiRequest,
} from "../../../generated/interface";
import message from "@arco-design/web-vue/es/message";
import { defineProps, onMounted, ref, withDefaults } from "vue";
import { IconPlayArrow } from "@arco-design/web-vue/es/icon";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import { useStore } from "vuex";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const store = useStore();

const isShow = ref(false);

const interfaceInfoInfo = ref<InterfaceInfoVO>();

const loadData = async () => {
  const res = await InterfaceControllerService.getInterfaceInfoVoByIdUsingGet(
    props.id as any
  );
  if (res.code == 0) {
    interfaceInfoInfo.value = res.data;
  } else {
    message.error("获取开放接口失败，" + res.message);
  }
};

onMounted(() => {
  loadData();
});

const showOnlineTest = () => {
  isShow.value = true;
};

const form = ref<OnlineInvokeApiRequest>({
  id: props.id as any,
  requestParam: "{" + "\n" + "\n" + "}",
});

const invokeResponse = ref();

const handleJsonChange = (json: string) => {
  form.value.requestParam = json;
};

const doSubmit = async () => {
  const res = await InterfaceControllerService.onlineInvokeApiUsingPost(
    form.value
  );
  if (res.code == 0) {
    invokeResponse.value = res.data;
  } else {
    message.error("调用接口失败，" + res.message);
  }
};
</script>

<style scoped>
#interfaceInfoInfoView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}

.paramDiv {
  width: 100%;
  margin: 0 auto; /* 水平居中 */
  padding: 16px; /* 可根据需要添加内边距 */
  border: 1px #1081ec solid;
  border-radius: 8px; /* 圆角 */
}
</style>
