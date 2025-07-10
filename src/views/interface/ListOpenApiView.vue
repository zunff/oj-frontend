<template>
  <div id="listOpenApiView">
    <el-table :data="dataList" style="width: 100%" border stripe>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="名称" show-overflow-tooltip />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'info'">
            {{ row.status === 1 ? "已发布" : "未发布" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="method" label="请求类型" width="100" />
      <el-table-column prop="url" label="访问地址" show-overflow-tooltip />
      <el-table-column label="操作" width="300" fixed="right">
        <template #default="{ row }">
          <el-button
            v-if="isAdmin"
            type="primary"
            size="small"
            @click="doUpdate(row)"
            >修改</el-button
          >
          <el-button
            v-if="isAdmin"
            type="danger"
            size="small"
            @click="doDelete(row)"
            >删除</el-button
          >
          <!-- <el-button
            v-if="row.status === 0"
            type="success"
            size="small"
            @click="doPublish(row)"
            >发布</el-button
          >
          <el-button
            v-if="row.status === 1"
            type="warning"
            size="small"
            @click="doOffline(row)"
            >下线</el-button
          > -->
          <el-button type="info" size="small" @click="doView(row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="searchParams.current"
        v-model:page-size="searchParams.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  getInterfaceList,
  deleteInterface,
  publishInterface,
  offlineInterface,
} from "@/api";
import { ElMessage, ElMessageBox } from "element-plus";
import accessEnum from "@/access/accessEnum";

const store = useStore();
const router = useRouter();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const isAdmin = computed(() => {
  return store.state.user.loginUser?.userRole === accessEnum.ADMIN;
});

const loadData = async () => {
  try {
    const res = await getInterfaceList(searchParams.value);
    dataList.value = res.data.records;
    total.value = res.data.total;
  } catch (error) {
    ElMessage.error("获取接口列表失败");
  }
};

watchEffect(() => {
  loadData();
});

const onSizeChange = (size: number) => {
  searchParams.value.pageSize = size;
  searchParams.value.current = 1;
};

const onCurrentChange = (page: number) => {
  searchParams.value.current = page;
};

const doDelete = async (row: any) => {
  try {
    await ElMessageBox.confirm("确定要删除该接口吗？", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
    await deleteInterface(row.id);
    ElMessage.success("删除成功");
    loadData();
  } catch (error) {
    if (error !== "cancel") {
      ElMessage.error("删除失败");
    }
  }
};

const doUpdate = (row: any) => {
  router.push({
    path: "/update/interface",
    query: { id: row.id },
  });
};

const doPublish = async (row: any) => {
  try {
    await publishInterface(row.id);
    ElMessage.success("发布成功");
    loadData();
  } catch {
    ElMessage.error("发布失败");
  }
};

const doOffline = async (row: any) => {
  try {
    await offlineInterface(row.id);
    ElMessage.success("下线成功");
    loadData();
  } catch {
    ElMessage.error("下线失败");
  }
};

const doView = (row: any) => {
  router.push({
    path: `/interface/document/${row.id}`,
  });
};
</script>

<style scoped>
#listOpenApiView {
  max-width: 1280px;
  margin: 0 auto;
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
