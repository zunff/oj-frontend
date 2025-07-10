<template>
  <div id="manageQuestionView">
    <el-table :data="dataList" style="width: 100%" border stripe>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" show-overflow-tooltip />
      <el-table-column prop="content" label="内容" show-overflow-tooltip />
      <el-table-column label="标签" width="200">
        <template #default="{ row }">
          <el-tag
            v-for="(tag, index) in row.tags"
            :key="index"
            type="success"
            style="margin-right: 5px; margin-bottom: 5px"
          >
            {{ tag }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="answer" label="标准答案" show-overflow-tooltip />
      <el-table-column label="判题限制" width="200">
        <template #default="{ row }">
          <div>
            <div>时间: {{ row.judgeConfig.timeLimit }}</div>
            <div>内存: {{ row.judgeConfig.memoryLimit }}</div>
            <div>堆栈: {{ row.judgeConfig.stackLimit }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="判题用例" width="150">
        <template #default="{ row }">
          <div v-for="(caseItem, index) in row.judgeCase" :key="index">
            <div>输入{{ index + 1 }}：{{ caseItem.input }}</div>
            <div>输出{{ index + 1 }}：{{ caseItem.output }}</div>
            <div>-------------</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="发布者编号" width="100" />
      <el-table-column label="更新时间" width="120">
        <template #default="{ row }">
          {{ moment(row.updateTime).format("YYYY-MM-DD") }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="155" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="doUpdate(row)">
            修改
          </el-button>
          <el-button type="danger" size="small" @click="doDelete(row)">
            删除
          </el-button>
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
import { onMounted, ref, watchEffect } from "vue";
import { getQuestionList, deleteQuestion, type Question } from "@/api";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import moment from "moment";

const dataList = ref<any[]>([]);
const total = ref(0);

const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  try {
    const res = await getQuestionList(searchParams.value);
    dataList.value = res.data.records;
    total.value = res.data.total;
  } catch (error) {
    ElMessage.error("获取题目列表失败");
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

const doDelete = async (question: Question) => {
  try {
    await ElMessageBox.confirm("确定要删除这个题目吗？", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });

    await deleteQuestion(question.id);
    ElMessage.success("删除成功");
    loadData();
  } catch (error) {
    if (error !== "cancel") {
      ElMessage.error("删除失败");
    }
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
</script>

<style scoped>
#manageQuestionView {
  max-width: 1280px;
  margin: 0 auto;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
