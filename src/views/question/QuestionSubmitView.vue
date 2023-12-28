<template>
  <div id="questionSubmitView">
    <a-form :model="searchParams" layout="inline" style="margin-bottom: 30px">
      <a-form-item field="title" label="题号">
        <a-input
          v-model="searchParams.questionId"
          placeholder="请输入题号"
          style="min-width: 240px"
        />
      </a-form-item>
      <a-form-item>
        <a-select
          :style="{ width: '110px', backgroundColor: '#ffffff' }"
          v-model="searchParams.language"
          placeholder="选择语言"
          allow-clear
        >
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total: total,
        showTotal: true,
      }"
      @pageChange="onPageChange"
      column-resizable
      :bordered="{ cell: true }"
    >
      <template #judgeInfo="{ record }">
        <div>
          {{ JSON.stringify(record.judgeInfo) }}
        </div>
      </template>
      <template #status="{ record }">
        <a-tag :color="getColor(record.status)"
          >{{ getStatus(record.status) }}
        </a-tag>
      </template>
      <template #memory="{ record }">
        {{ record.judgeInfo.memory }}
      </template>
      <template #time="{ record }">
        {{ record.judgeInfo.time }}
      </template>
      <template #message="{ record }">
        {{ record.judgeInfo.message }}
      </template>
      <template #createTime="{ record }">
        <div>
          {{ moment(record.createTime).format("YYYY-MM-DD") }}
        </div>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated/question";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const dataList = ref([]);
const total = ref(0);

const getStatus = (value: number) => {
  switch (value) {
    case 0:
      return "等待中";
    case 1:
      return "判题中";
    case 2:
      return "Accepted";
    case 3:
      return "ERROR";
    default:
      return "";
  }
};

const getColor = (value: number) => {
  switch (value) {
    case 0:
      return "lime";
    case 1:
      return "gold";
    case 2:
      return "green";
    case 3:
      return "red";
    default:
      return "green";
  }
};

const searchParams = ref<QuestionSubmitQueryRequest>({
  language: "",
  pageSize: 10,
  current: 1,
  sortField: "createTime",
  sortOrder: "descend",
});

const loadData = async () => {
  const res =
    await QuestionControllerService.listQuestionSubmitVoByPageUsingPost(
      searchParams.value
    );
  if (res.code == 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("获取题目列表失败，" + res.message);
  }
};

watchEffect(() => {
  loadData();
});

onMounted(() => {
  loadData();
});

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const doSubmit = () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
  // loadData();
};

const router = useRouter();

const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

const columns = [
  {
    title: "提交号",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题状态",
    dataIndex: "status",
    slotName: "status",
  },
  {
    title: "占用内存",
    slotName: "memory",
  },
  {
    title: "运行时间",
    slotName: "time",
  },
  {
    title: "运行信息",
    slotName: "message",
  },
  {
    title: "题目名称",
    dataIndex: "questionVO.title",
  },
  {
    title: "提交者",
    dataIndex: "userVO.userName",
  },
  {
    title: "提交时间",
    dataIndex: "createTime",
    slotName: "createTime",
    width: 145,
  },
];
</script>

<style scoped>
#questionSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
