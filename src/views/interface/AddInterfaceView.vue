<template>
  <div id="addInterfaceInfoView">
    <el-form :model="form" label-width="120px">
      <el-form-item label="接口名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入名称"
          style="width: 638px"
        />
      </el-form-item>
      <el-form-item label="接口内容" prop="description">
        <MdEditor :value="form.description" :handle-change="onDescChange" />
      </el-form-item>
      <el-form-item label="请求类型" prop="method">
        <el-radio-group v-model="form.method">
          <el-radio value="Post">Post</el-radio>
          <el-radio value="Get">Get</el-radio>
          <el-radio value="Update">Update</el-radio>
          <el-radio value="Delete">Delete</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="访问地址" prop="url">
        <el-input
          v-model="form.url"
          placeholder="请输入访问地址"
          style="width: 638px"
        />
      </el-form-item>
      <el-form-item label="访问参数示例" prop="requestParam">
        <el-collapse>
          <el-collapse-item title="点击输入示例访问参数">
            <el-skeleton :loading="loading" animated>
              <template #template>
                <div class="paramDiv">
                  <div style="height: 30vh"></div>
                </div>
              </template>
              <template #default>
                <div v-if="!loading" class="paramDiv">
                  <CodeEditor
                    :value="form.requestParam"
                    language="json"
                    :handle-change="onReqParamChange"
                    min-height="30vh"
                    max-height="35vh"
                  />
                </div>
              </template>
            </el-skeleton>
          </el-collapse-item>
        </el-collapse>
      </el-form-item>
      <el-form-item label="响应体示例" prop="responseBody">
        <el-collapse>
          <el-collapse-item title="点击输入示例响应体">
            <el-skeleton :loading="loading" animated>
              <template #template>
                <div class="paramDiv">
                  <div style="height: 30vh"></div>
                </div>
              </template>
              <template #default>
                <div v-if="!loading" class="paramDiv">
                  <CodeEditor
                    :value="form.responseBody"
                    language="json"
                    :handle-change="onRepBodyChange"
                    min-height="30vh"
                    max-height="35vh"
                  />
                </div>
              </template>
            </el-skeleton>
          </el-collapse-item>
        </el-collapse>
      </el-form-item>
      <el-form-item label="接口状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :value="0">关闭</el-radio>
          <el-radio :value="1">开启</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSubmit" style="width: 200px">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {
  addInterface,
  updateInterface,
  getInterfaceById,
  type InterfaceInfoVO,
} from "@/api";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import CodeEditor from "@/components/CodeEditor.vue";

const route = useRoute();

const loading = ref(true);

const form = ref<InterfaceInfoVO>({
  requestParam: "{" + "\n\n" + "}",
  responseBody: "{" + "\n\n" + "}",
} as any);

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
  try {
    const res = await getInterfaceById(Number(id));
    form.value = res.data as any;
    loading.value = false;
  } catch (error) {
    ElMessage.error("加载失败");
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
  try {
    if (updatePage) {
      await updateInterface(form.value);
      ElMessage.success("更新成功");
      router.push({ path: "/list/api" });
    } else {
      await addInterface(form.value);
      ElMessage.success("创建成功");
      router.push({ path: "/list/api" });
    }
  } catch (error) {
    ElMessage.error(updatePage ? "更新失败" : "创建失败");
  }
};
</script>

<style scoped>
#addInterfaceInfoView {
  max-width: 1280px;
  margin: 0 auto;
}

.paramDiv {
  width: 580px;
  height: 35vh;
  padding: 16px; /* 可根据需要添加内边距 */
  border: 1px #1081ec solid;
  border-radius: 8px; /* 圆角 */
  background-color: rgb(255, 255, 255);
}
</style>
