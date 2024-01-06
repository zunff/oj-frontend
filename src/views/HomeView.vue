<template>
  <div id="homeView">
    <a-form :model="searchParams" layout="inline" style="margin-bottom: 30px">
      <a-form-item field="title" label="标题">
        <a-input
          v-model="searchParams.title"
          placeholder="请输入标题"
          style="min-width: 240px"
        />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag
          v-model="searchParams.tags"
          placeholder="请输入标签"
          style="min-width: 240px"
        />
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
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestionPage(record)"
            >做题
          </a-button>
        </a-space>
      </template>
      <template #tags="{ record }">
        <div>
          <a-space wrap>
            <a-tag
              v-for="(tag, index) of record.tags"
              :key="index"
              color="green"
              >{{ tag }}
            </a-tag>
          </a-space>
        </div>
      </template>
      <template #acceptRate="{ record }">
        <div>
          {{
            `${
              record.submitNum
                ? Math.ceil((record.acceptedNum / record.submitNum) * 100)
                : 0
            }% (${record.acceptedNum}/${record.submitNum})`
          }}
        </div>
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
  QuestionQueryRequest,
} from "../../generated/question";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const dataList = ref([]);
const total = ref(0);

const searchParams = ref<QuestionQueryRequest>({
  tags: [],
  title: "",
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
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
    title: "题目编号",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
    ellipsis: true,
  },
  {
    title: "标签",
    dataIndex: "tags",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptRate",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTime",
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
#homeView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
