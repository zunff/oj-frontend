<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="8" :xs="24">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="题目描述">
            <a-card
              :style="{
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                minHeight: '75vh',
              }"
              v-if="question"
              :title="question.title"
              :header-style="{
                backgroundColor: '#fafafa',
                borderRadius: '10px 10px 0 0',
              }"
            >
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 1, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question?.content" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="2" title="评论"> 评论区</a-tab-pane>
          <a-tab-pane key="3" title="题解">
            <MdViewer v-if="question" :value="question.answer" />
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="16" :xs="24">
        <a-card
          :style="{
            borderRadius: '10px',
            height: '81vh',
          }"
        >
          <code-editor
            :value="form.code"
            :handle-change="onEditChange"
            :language="form.language"
          />
          <template #title>
            <a-select
              :style="{ width: '110px', backgroundColor: '#ffffff' }"
              v-model="form.language"
              placeholder="选择语言"
              allow-clear
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
            </a-select>
          </template>
          <template #extra>
            <a-button type="outline" status="success" @click="doSubmit">
              <IconPlayArrow />
              提交代码
            </a-button>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../generated/question";
import message from "@arco-design/web-vue/es/message";
import { ref, defineProps, withDefaults, onMounted, watch } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import { IconPlayArrow } from "@arco-design/web-vue/es/icon";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<QuestionVO>();

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code == 0) {
    question.value = res.data;
  } else {
    message.error("获取题目列表失败，" + res.message);
  }
};

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
  questionId: props.id as any,
});

const onEditChange = (v: string) => {
  form.value.code = v;
};

const doSubmit = async () => {
  const res = await QuestionControllerService.doSubmitUsingPost(form.value);
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败，" + res.message);
  }
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
#viewQuestionView {
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
