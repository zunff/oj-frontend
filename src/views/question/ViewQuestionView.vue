<template>
  <div class="question-submit-container">
    <!-- 左侧：题目信息 -->
    <div class="left-panel">
      <div class="question-title">{{ question?.title }}</div>
      <MdViewer :value="question?.content || ''" />
      <div class="question-info">
        <span>标签：</span>
        <el-tag
          v-for="(tag, idx) in question?.tags || []"
          :key="idx"
          type="success"
          style="margin-right: 5px"
          >{{ tag }}</el-tag
        >
      </div>
      <div class="question-info">
        <span>通过率：</span>
        <span>
          {{
            question?.submitNum
              ? Math.ceil((question.acceptedNum / question.submitNum) * 100)
              : 0
          }}% ({{ question?.acceptedNum }}/{{ question?.submitNum }})
        </span>
      </div>
      <div class="question-info">
        <span>判题限制：</span>
        <ul class="judge-config-list">
          <li>时间限制：{{ question?.judgeConfig?.timeLimit ?? "-" }} ms</li>
          <li>内存限制：{{ question?.judgeConfig?.memoryLimit ?? "-" }} MB</li>
          <li>堆栈限制：{{ question?.judgeConfig?.stackLimit ?? "-" }} MB</li>
        </ul>
      </div>
    </div>

    <!-- 右侧：代码编辑器和提交 -->
    <div class="right-panel">
      <div class="editor-header">
        <el-select v-model="language" style="width: 120px; margin-right: 12px">
          <el-option label="Java" value="java" />
          <el-option label="Python" value="python" />
          <el-option label="C++" value="cpp" />
          <!-- 可根据需要添加更多语言 -->
        </el-select>
        <el-button type="primary" @click="handleSubmit">提交代码</el-button>
      </div>
      <CodeEditor
        v-if="question"
        :value="code"
        :language="language"
        :handle-change="onCodeChange"
        minHeight="60vh"
        maxHeight="70vh"
      />
      <div v-if="result" class="result-panel">
        <el-alert :title="result" type="success" show-icon />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getQuestionById, submitQuestion } from "@/api/question";
import MdViewer from "@/components/MdViewer.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { ElMessage } from "element-plus";

const route = useRoute();
const question = ref<any>(null);
const code = ref("");
const language = ref("java");
const result = ref("");
const defaultCodeMap: Record<string, string> = {
  java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        
    }
}`,
};

watch(language, (newLang, oldLang) => {
  // 只有当用户没有写代码时才自动填充，防止覆盖用户输入
  if (!code.value.trim()) {
    code.value = defaultCodeMap[newLang] || "";
  }
});

onMounted(async () => {
  const id = route.params.id || route.query.id;
  if (id) {
    const res = await getQuestionById(id as string);
    if (res.code === 0 && res.data) {
      question.value = res.data;
      code.value = defaultCodeMap[language.value] || "";
    }
  }
});

const onCodeChange = (val: string) => {
  code.value = val;
};

const handleSubmit = async () => {
  if (!code.value.trim()) {
    ElMessage.warning("请输入代码后再提交！");
    return;
  }
  if (!question.value?.id) {
    ElMessage.error("题目信息异常！");
    return;
  }
  try {
    const res = await submitQuestion({
      code: code.value,
      language: language.value,
      questionId: question.value.id,
    });
    if (res.code === 0) {
      result.value = "提交成功，提交ID：" + res.data;
      ElMessage.success("提交成功！");
    } else {
      result.value = "提交失败：" + (res.message || "未知错误");
      ElMessage.error(res.message || "提交失败");
    }
  } catch (e) {
    result.value = "提交异常";
    ElMessage.error("提交异常");
  }
};
</script>

<style scoped>
.question-submit-container {
  display: flex;
  flex-direction: row;
  height: 80vh;
  min-height: 600px;
  max-width: 1400px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #f0f1f2;
  padding: 24px;
  gap: 24px;
}
.left-panel {
  flex: 1.1;
  padding-right: 16px;
  border-right: 1px solid #f0f0f0;
  overflow-y: auto;
}
.right-panel {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  padding-left: 16px;
}
.editor-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 12px;
}
.question-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 18px;
}
.question-info {
  margin-top: 12px;
  color: #888;
  font-size: 14px;
}
.result-panel {
  margin-top: 18px;
}
.judge-config-list {
  margin: 4px 0 0 0;
  padding: 0 0 0 18px;
  color: #555;
  font-size: 14px;
  list-style: disc;
}
</style>
