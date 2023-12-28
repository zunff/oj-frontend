<template>
  <div id="manageQuestionView">
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
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
      <template #judgeConfig="{ record }">
        <div>
          <div>时间限制: {{ JSON.parse(record.judgeConfig).timeLimit }}</div>
          <div>内存限制: {{ JSON.parse(record.judgeConfig).memoryLimit }}</div>
          <div>堆栈限制: {{ JSON.parse(record.judgeConfig).stackLimit }}</div>
        </div>
      </template>
      <template #judgeCase="{ record }">
        <div
          v-for="(caseItem, index) in JSON.parse(record.judgeCase)"
          :key="index"
        >
          <div>输入{{ index + 1 }}：{{ caseItem.input }}</div>
          <div>输出{{ index + 1 }}：{{ caseItem.output }}</div>
        </div>
      </template>
      <template #createTime="{ record }">
        <div>
          {{ moment(record.createTime).format("YYYY-MM-DD") }}
        </div>
      </template>
      <template #updateTime="{ record }">
        <div>
          {{ moment(record.updateTime).format("YYYY-MM-DD") }}
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
} from "../../../generated/question";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const dataList = ref([]);
const total = ref(0);

const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
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

const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });

  if (res.code == 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败，" + res.message);
  }
};

const router = useRouter();

const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
    ellipsis: true,
  },
  {
    title: "内容",
    dataIndex: "content",
    ellipsis: true,
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "标准答案",
    dataIndex: "answer",
    ellipsis: true,
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
    width: 40,
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
    width: 40,
  },
  {
    title: "判题限制",
    dataIndex: "judgeConfig",
    slotName: "judgeConfig",
    width: 130,
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
    slotName: "judgeCase",
  },
  {
    title: "发布者编号",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTime",
    width: 145,
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    slotName: "updateTime",
    width: 145,
  },
  {
    title: "Optional",
    slotName: "optional",
    width: 155,
  },
];
</script>

<style scoped>
#manageQuestionView {
}
</style>
