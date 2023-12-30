<template>
  <div id="addQuestionView">
    <a-form :model="form" label-align="left">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag
          v-model="form.tags"
          placeholder="请输入标签，输入完成后按回车键"
          allow-clear
        />
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <MdEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor :value="form.answer" :handle-change="onAnswerChange" />
      </a-form-item>
      <a-form-item
        field="judgeStrategy"
        label="判题策略"
        tooltip="选择same时，要求用户输出与答案完全一致，any则表示用户输出只要与答案其中一个相等即可。"
      >
        <a-space size="large">
          <a-radio-group v-model="form.judgeStrategy">
            <a-radio value="same">same</a-radio>
            <a-radio value="any">any</a-radio>
          </a-radio-group>
        </a-space>
      </a-form-item>
      <a-form-item
        :label="`测试用例配置`"
        :content-flex="false"
        :merge-props="false"
      >
        <div v-for="(judgeCaseItem, index) of form.judgeCase" :key="index">
          <a-space direction="vertical" style="min-width: 480px">
            <a-form-item
              :field="`judgeCaseItem[${index}].input`"
              :label="`输入用例-${index + 1}`"
              :key="index"
              help="若要输入多个参数，请用空格隔开"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入测试输入用例"
              />
              <a-button
                @click="handleDelete(index)"
                :style="{ marginLeft: '10px' }"
                status="danger"
                >删除
              </a-button>
            </a-form-item>

            <a-form-item
              :field="`judgeCaseItem[${index}].output`"
              :label="`输出用例-${index + 1}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                :placeholder="
                  form.judgeStrategy === 'any'
                    ? '多个答案间用英文分号;隔开'
                    : '请输入测试输出用例'
                "
              />
            </a-form-item>
          </a-space>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button @click="handleAdd" type="outline" status="success"
          >新增测试用例
        </a-button>
      </a-form-item>
      <a-form-item label="判题限制" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="min-width: 480px">
          <a-form-item field="judgeConfig.timeLimit" label="时间限制">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制"
              mode="button"
              min="0"
              size="large"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制"
              mode="button"
              min="0"
              size="large"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入堆栈限制"
              mode="button"
              min="0"
              size="large"
            />
          </a-form-item>
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
  QuestionControllerService,
  QuestionVO,
} from "../../../generated/question";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const form = ref<QuestionVO>({
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 0,
    stackLimit: 0,
    timeLimit: 0,
  },
  judgeStrategy: "",
  tags: [],
  title: "",
});

//通过路由来区分是添加还是更新
const updatePage = route.path.includes("update");

//根据id获取老的题目信息
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    console.log(form.value);
  } else {
    message.error("加载失败，" + res.message);
  }
};

onMounted(() => {
  loadData();
});

const onAnswerChange = (v: string) => {
  form.value.answer = v;
};

const onContentChange = (v: string) => {
  form.value.content = v;
};

const handleAdd = () => {
  if (form.value.judgeCase != undefined) {
    form.value.judgeCase.push({
      input: "",
      output: "",
    });
  }
};
const handleDelete = (index: number) => {
  if (form.value.judgeCase != undefined) {
    form.value.judgeCase.splice(index, 1);
  }
};

const router = useRouter();

const doSubmit = async () => {
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("更新成功");
      router.push({ path: "/manage/question" });
    } else {
      message.error("更新失败，" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("创建成功");
      router.push({ path: "/manage/question" });
    } else {
      message.error("创建失败，" + res.message);
    }
  }
};
</script>

<style scoped>
#addQuestionView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
