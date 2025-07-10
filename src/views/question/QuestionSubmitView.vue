<template>
  <div class="my-submit-list-container">
    <h2 style="margin-bottom: 18px">我的提交记录</h2>
    <el-table :data="dataList" border stripe style="width: 100%">
      <el-table-column
        prop="questionVO.title"
        label="题目标题"
        show-overflow-tooltip
      />
      <el-table-column prop="language" label="语言" width="100" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="statusTagType(row.status)">
            {{ statusText(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="judgeInfo.time" label="执行用时(ms)" width="120" />
      <el-table-column prop="judgeInfo.memory" label="内存(KB)" width="120" />
      <el-table-column prop="createTime" label="提交时间" width="180">
        <template #default="{ row }">
          {{ formatTime(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="viewDetail(row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="searchParams.current"
        v-model:page-size="searchParams.pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </div>
    <el-dialog v-model="dialogVisible" title="提交详情" width="70%">
      <div style="margin-bottom: 16px">
        <h3>判题信息</h3>
        <pre style="white-space: pre-wrap">{{
          selectedSubmission?.judgeInfo?.message
        }}</pre>
      </div>
      <div>
        <h3>提交代码</h3>
        <CodeEditor :value="selectedSubmission?.code" read-only />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getSubmitList } from "@/api/question";
import { ElMessage } from "element-plus";
import moment from "moment";
import CodeEditor from "@/components/CodeEditor.vue";

const dataList = ref<any[]>([]);
const total = ref(0);
const dialogVisible = ref(false);
const selectedSubmission = ref<any>(null);
const searchParams = ref({
  current: 1,
  pageSize: 10,
  userId: undefined, // 当前用户id
});

const loadData = async () => {
  try {
    const res = await getSubmitList(searchParams.value);
    if (res.code === 0 && res.data) {
      dataList.value = res.data.records;
      total.value = res.data.total;
    } else {
      ElMessage.error(res.message || "获取提交记录失败");
    }
  } catch (e) {
    console.log("获取提交记录失败" + e);
  }
};

onMounted(() => {
  loadData();
});

const onSizeChange = (size: number) => {
  searchParams.value.pageSize = size;
  searchParams.value.current = 1;
  loadData();
};

const onCurrentChange = (page: number) => {
  searchParams.value.current = page;
  loadData();
};

const formatTime = (time: string) => {
  return moment(time).format("YYYY-MM-DD HH:mm:ss");
};

const statusText = (status: number) => {
  // 你可以根据后端返回的status定义
  switch (status) {
    case 0:
      return "待判题";
    case 1:
      return "通过";
    case 2:
      return "失败";
    case 3:
      return "运行错误";
    case 4:
      return "超时";
    default:
      return "未知";
  }
};

const statusTagType = (status: number) => {
  switch (status) {
    case 1:
      return "success";
    case 2:
      return "danger";
    case 3:
      return "warning";
    case 4:
      return "info";
    default:
      return "";
  }
};

const viewDetail = (row: any) => {
  selectedSubmission.value = row;
  dialogVisible.value = true;
};
</script>

<style scoped>
.my-submit-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 0;
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
pre {
  background: #f5f7fa;
  padding: 16px;
  border-radius: 4px;
  max-height: 300px;
  overflow: auto;
}
</style>
