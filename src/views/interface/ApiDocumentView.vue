<template>
  <div id="apiDocumentView">
    <h2>{{ interfaceInfo?.name || "接口文档" }}</h2>
    <div class="api-info" v-if="interfaceInfo">
      <div class="api-title">
        <b>{{ interfaceInfo.name }}</b>
      </div>
      <div class="api-url">
        <span>{{ interfaceInfo.url }}</span>
      </div>
      <div class="api-section">
        <b>请求参数示例</b>
        <pre>{{ interfaceInfo.requestParam }}</pre>
      </div>
      <div class="api-section">
        <b>响应体示例</b>
        <pre>{{ interfaceInfo.responseBody }}</pre>
      </div>
      <div class="api-section">
        <b>请求类型</b> <span>{{ interfaceInfo.method }}</span>
      </div>
      <div class="api-section">
        <b>接口状态</b>
        <span :style="{ color: interfaceInfo.status === 1 ? 'green' : 'gray' }">
          ● {{ interfaceInfo.status === 1 ? "开启" : "关闭" }}
        </span>
      </div>
      <div class="api-section">
        <b>接口调用次数</b>
        <span>{{ interfaceInfo.leftNum }}</span>
      </div>
      <div class="api-section">
        <el-button type="primary" @click="handleTestClick" v-if="!showTest"
          >在线测试</el-button
        >
      </div>
    </div>

    <div v-if="showTest" class="api-test">
      <h3>在线测试</h3>
      <el-input
        type="textarea"
        v-model="testParams"
        :rows="8"
        placeholder="请求参数"
        style="margin-bottom: 10px"
      />
      <el-button type="success" @click="handleSend">发送</el-button>
      <div v-if="testResult" class="test-result">
        <b>响应结果：</b>
        <pre>{{ testResult }}</pre>
      </div>
      <div ref="bottomRef"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import {
  getInterfaceById,
  invokeInterface,
  getInvokeCount,
} from "@/api/interface";
import { useStore } from "vuex";

const route = useRoute();

const interfaceInfo = ref<any>(null);
const showTest = ref(false);
const testParams = ref("");
const testResult = ref("");
const bottomRef = ref<HTMLElement | null>(null);

const fetchInterfaceInfo = async (id: string) => {
  try {
    const res = await getInterfaceById(id);
    interfaceInfo.value = res.data;
    // 默认填充请求参数示例
    testParams.value = res.data.requestParam || "";
  } catch (e: any) {
    ElMessage.error("获取接口详情失败：" + (e.message || e));
  }
};

const handleTestClick = () => {
  showTest.value = true;
  nextTick(() => {
    bottomRef.value?.scrollIntoView({ behavior: "smooth" });
  });
};

const handleSend = async () => {
  try {
    const params = JSON.parse(testParams.value);
    const res = await invokeInterface({
      id: route.params.id as string,
      requestParam: JSON.stringify(params),
    });
    testResult.value = JSON.stringify(res.data, null, 2);
    // 重新获取调用次数
    fetchInterfaceInfo(route.params.id as string);
  } catch (e: any) {
    ElMessage.error("请求失败：" + (e.message || e));
  }
};

const loadAll = () => {
  const id = route.params.id as string;
  if (!id) return;
  fetchInterfaceInfo(id);
};

onMounted(loadAll);
watch(() => route.params.id, loadAll);
</script>

<style scoped>
#apiDocumentView {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}
.api-info {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px #f0f1f2;
}
.api-title {
  font-size: 20px;
  margin-bottom: 12px;
}
.api-url {
  color: #409eff;
  margin-bottom: 16px;
}
.api-section {
  margin-bottom: 16px;
}
.api-test {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px #f0f1f2;
}
.test-result {
  margin-top: 16px;
  background: #fff;
  border-radius: 4px;
  padding: 12px;
  font-size: 14px;
  color: #333;
}
</style>
