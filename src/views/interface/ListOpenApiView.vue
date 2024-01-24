<template>
  <div id="manageInterfaceInfoView">
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
      <template #name="{ record }">
        <a-link @click="goTest(record)">{{ record.name }}</a-link>
      </template>

      <template #optional="{ record }">
        <a-space
          v-if="store.state.user.loginUser.userRole !== AccessEnum.ADMIN"
        >
          <a-button type="text" @click="goTest(record)">查看文档</a-button>
        </a-space>
        <a-space v-else>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>

      <template #status="{ record }">
        <div v-if="record.status == 0">
          <a-badge status="normal" />
          关闭
        </div>
        <div v-else>
          <a-badge status="success" />
          开启
        </div>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import AccessEnum from "@/access/accessEnum";
import {
  InterfaceControllerService,
  InterfaceInfo,
} from "../../../generated/interface";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const dataList = ref([]);
const total = ref(0);
const store = useStore();

const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res =
    await InterfaceControllerService.listInterfaceInfoVoByPageUsingPost(
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

const doDelete = async (interfaceInfo: InterfaceInfo) => {
  const res = await InterfaceControllerService.deleteInterfaceInfoUsingPost({
    id: interfaceInfo.id,
  });

  if (res.code == 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败，" + res.message);
  }
};

const router = useRouter();

const doUpdate = (interfaceInfo: InterfaceInfo) => {
  router.push({
    path: "/update/interface",
    query: {
      id: interfaceInfo.id,
    },
  });
};

const goTest = (interfaceInfo: InterfaceInfo) => {
  router.push({
    path: `/interface/document/${interfaceInfo.id}`,
  });
};

const columns = [
  {
    title: "id",
    dataIndex: "id",
    width: 50,
  },
  {
    title: "名称",
    dataIndex: "name",
    slotName: "name",
    ellipsis: true,
    width: 100,
  },
  {
    title: "访问地址",
    dataIndex: "url",
    ellipsis: true,
  },
  {
    title: "状态",
    dataIndex: "status",
    slotName: "status",
    width: 100,
  },
  {
    title: "请求类型",
    dataIndex: "method",
    ellipsis: true,
    width: 100,
  },
  {
    title: "描述",
    dataIndex: "description",
    ellipsis: true,
  },
  {
    title: "Optional",
    slotName: "optional",
    width: 155,
  },
];
</script>

<style scoped>
#manageInterfaceInfoView {
}
</style>
