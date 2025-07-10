<template>
  <div id="addQuestionView">
    <el-form
      :model="form"
      label-width="100px"
      style="max-width: 900px; margin: 0 auto"
    >
      <el-form-item label="标题" prop="title" required>
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <TagInput v-model="form.tags" placeholder="请输入标签，回车添加" />
      </el-form-item>
      <el-form-item label="题目内容" prop="content" required>
        <MdEditor
          :value="form.content"
          :handle-change="(val) => (form.content = val)"
        />
      </el-form-item>
      <el-form-item label="答案" prop="answer" required>
        <MdEditor
          :value="form.answer"
          :handle-change="(val) => (form.answer = val)"
        />
      </el-form-item>
      <el-form-item label="判题策略" prop="judgeStrategy">
        <el-radio-group v-model="form.judgeStrategy">
          <el-radio label="same">
            same
            <span class="tip">（要求用户输出与答案完全一致）</span>
          </el-radio>
          <el-radio label="any">
            any
            <span class="tip">（用户输出只要答案某一项即可）</span>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="测试用例配置">
        <div
          v-for="(item, idx) in form.judgeCase"
          :key="idx"
          style="margin-bottom: 18px"
        >
          <!-- 输入用例 -->
          <div style="margin-bottom: 4px">
            <span style="width: 90px; color: #666; display: inline-block"
              >输入用例-{{ idx + 1 }}</span
            >
            <el-input
              v-model="item.input"
              placeholder="请输入测试输入用例"
              style="width: 400px"
            />
            <el-button
              type="danger"
              @click="removeCase(idx)"
              v-if="form.judgeCase.length > 1"
              style="margin-left: 8px"
              >删除</el-button
            >
          </div>
          <div
            style="
              margin-left: 90px;
              color: #aaa;
              font-size: 13px;
              margin-bottom: 6px;
            "
          >
            若要输入多个参数，请用空格隔开
          </div>
          <!-- 输出用例 -->
          <div style="margin-bottom: 8px">
            <span style="width: 90px; color: #666; display: inline-block"
              >输出用例-{{ idx + 1 }}</span
            >
            <el-input
              v-model="item.output"
              placeholder="请输入测试输出用例"
              style="width: 400px"
            />
          </div>
          <el-divider />
        </div>
        <el-button type="success" plain @click="addCase"
          >新增测试用例</el-button
        >
      </el-form-item>
      <el-form-item label="判题限制">
        <el-row :gutter="10" style="width: 100%">
          <el-col :span="8">
            <el-form-item label="时间限制" label-width="70px">
              <el-input-number
                v-model="form.judgeConfig.timeLimit"
                :min="0"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="内存限制" label-width="70px">
              <el-input-number
                v-model="form.judgeConfig.memoryLimit"
                :min="0"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="堆栈限制" label-width="70px">
              <el-input-number
                v-model="form.judgeConfig.stackLimit"
                :min="0"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { addQuestion, getQuestionById, updateQuestion } from "@/api/question";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import MdEditor from "@/components/MdEditor.vue";
import TagInput from "@/components/TagInput.vue";

const router = useRouter();
const route = useRoute();

const form = ref({
  title: "",
  tags: [], // 保证为string[]
  content: "",
  answer: "",
  judgeStrategy: "same",
  judgeCase: [{ input: "", output: "" }],
  judgeConfig: {
    timeLimit: 0,
    memoryLimit: 0,
    stackLimit: 0,
  },
});

const isEdit = ref(false);

onMounted(async () => {
  const id = route.query.id;
  if (id) {
    isEdit.value = true;
    // 查询题目详情
    const res = await getQuestionById(id as string);
    if (res.code === 0 && res.data) {
      // 回显数据
      Object.assign(form.value, res.data);
      // 兼容 judgeCase/judgeConfig 字段格式
      if (!Array.isArray(form.value.judgeCase)) {
        form.value.judgeCase = [];
      }
      if (typeof form.value.judgeConfig !== "object") {
        form.value.judgeConfig = {
          timeLimit: 0,
          memoryLimit: 0,
          stackLimit: 0,
        };
      }
    }
  }
});

const addCase = () => {
  form.value.judgeCase.push({ input: "", output: "" });
};
const removeCase = (idx: number) => {
  if (form.value.judgeCase.length > 1) {
    form.value.judgeCase.splice(idx, 1);
  }
};

const handleSubmit = async () => {
  try {
    const submitData = {
      ...form.value,
      tagsJson: JSON.stringify(form.value.tags),
    };
    let res;
    if (isEdit.value) {
      // 修改
      res = await updateQuestion(submitData);
    } else {
      // 新增
      res = await addQuestion(submitData);
    }
    if (res.code === 0) {
      ElMessage.success(isEdit.value ? "修改成功" : "添加成功");
      router.push("/manage/question");
    } else {
      ElMessage.error(res.message || (isEdit.value ? "修改失败" : "添加失败"));
    }
  } catch (e) {
    ElMessage.error(isEdit.value ? "修改失败" : "添加失败");
  }
};
</script>

<style scoped>
#addQuestionView {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 0;
}
.tip {
  color: #aaa;
  font-size: 13px;
  margin-left: 4px;
}
</style>
