<template>
  <div id="addInterfaceInfoView">
    <a-form :model="form" label-align="left">
      <a-form-item field="name" label="接口名称">
        <a-input v-model="form.name" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item field="description" label="题目内容">
        <MdEditor :value="form.description" :handle-change="onDescChange" />
      </a-form-item>
      <a-form-item field="method" label="请求类型">
        <a-space size="large">
          <a-radio-group v-model="form.method">
            <a-radio value="Post">Post</a-radio>
            <a-radio value="Get">Get</a-radio>
            <a-radio value="Update">Update</a-radio>
            <a-radio value="Delete">Delete</a-radio>
          </a-radio-group>
        </a-space>
      </a-form-item>
      <a-form-item field="url" label="访问地址">
        <a-input v-model="form.url" placeholder="请输入访问地址" />
      </a-form-item>
      <a-form-item field="requestParam" label="访问参数示例">
        <a-spin
          :loading="loading"
          tip="This may take a while..."
          class="paramDiv"
        >
          <div v-if="!loading">
            <CodeEditor
              :value="form.requestParam"
              language="json"
              :handle-change="onReqParamChange"
            />
          </div>
        </a-spin>
      </a-form-item>
      <a-form-item field="responseBody" label="响应体示例">
        <a-spin
          :loading="loading"
          tip="This may take a while..."
          class="paramDiv"
        >
          <div v-if="!loading">
            <CodeEditor
              :value="form.responseBody"
              language="json"
              :handle-change="onRepBodyChange"
            />
          </div>
        </a-spin>
      </a-form-item>
      <a-form-item field="status" label="接口状态">
        <a-space size="large">
          <a-radio-group v-model="form.status">
            <a-radio :value="0">关闭</a-radio>
            <a-radio :value="1">开启</a-radio>
          </a-radio-group>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {
  InterfaceControllerService,
  InterfaceInfoVO,
} from "../../../generated/interface";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import CodeEditor from "@/components/CodeEditor.vue";

const route = useRoute();

const loading = ref(true);

const form = ref<InterfaceInfoVO>({
  requestParam: "{" + "\n\n" + "}",
  responseBody: "{" + "\n\n" + "}",
});

//通过路由来区分是添加还是更新
const updatePage = route.path.includes("update");

//根据id获取老的题目信息
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    //如果是添加操作，直接设置为false
    loading.value = false;
    return;
  }
  const res = await InterfaceControllerService.getInterfaceInfoVoByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    loading.value = false;
    console.log(form.value);
  } else {
    message.error("加载失败，" + res.message);
  }
};

onMounted(() => {
  loadData();
  setTimeout(() => {
    console.log(form.value);
  }, 3000);
});

const router = useRouter();

const onDescChange = (v: string) => {
  form.value.description = v;
};

const onReqParamChange = (v: string) => {
  form.value.requestParam = v;
};

const onRepBodyChange = (v: string) => {
  form.value.responseBody = v;
};

const doSubmit = async () => {
  if (updatePage) {
    const res = await InterfaceControllerService.updateInterfaceInfoUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("更新成功");
      router.push({ path: "/list/api" });
    } else {
      message.error("更新失败，" + res.message);
    }
  } else {
    const res = await InterfaceControllerService.addInterfaceInfoUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("创建成功");
      router.push({ path: "/list/api" });
    } else {
      message.error("创建失败，" + res.message);
    }
  }
};
</script>

<style scoped>
#addInterfaceInfoView {
  max-width: 1280px;
  margin: 0 auto;
}

.paramDiv {
  width: 70%;
  height: 81vh;
  padding: 16px; /* 可根据需要添加内边距 */
  border: 1px #1081ec solid;
  border-radius: 8px; /* 圆角 */
}
</style>
