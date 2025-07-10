<template>
  <div id="homeView">
    <el-form :model="searchParams" inline style="margin-bottom: 30px">
      <el-form-item label="标题">
        <el-input
          v-model="inputTitle"
          placeholder="请输入标题"
          style="min-width: 240px"
          @blur="onTitleBlur"
        />
      </el-form-item>
      <el-form-item label="标签">
        <TagInput
          v-model="searchParams.tags"
          placeholder="请输入标签"
          @change="onTagsChange"
        />
      </el-form-item>
    </el-form>

    <el-table :data="dataList" style="width: 100%" border stripe>
      <el-table-column prop="id" label="题目编号" width="100" />
      <el-table-column prop="title" label="标题" show-overflow-tooltip />
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
      <el-table-column label="通过率" width="150">
        <template #default="{ row }">
          {{
            `${
              row.submitNum
                ? Math.ceil((row.acceptedNum / row.submitNum) * 100)
                : 0
            }% (${row.acceptedNum}/${row.submitNum})`
          }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="145">
        <template #default="{ row }">
          {{ moment(row.createTime).format("YYYY-MM-DD") }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="toQuestionPage(row)">
            做题
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
import {
  getQuestionList,
  type Question,
  type QuestionQueryRequest,
} from "@/api";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import moment from "moment";
import { useStore } from "vuex";
import TagInput from "@/components/TagInput.vue";

const dataList = ref<any[]>([]);
const total = ref(0);

const searchParams = ref<QuestionQueryRequest>({
  tags: [], // 保证为string[]
  title: "",
  pageSize: 10,
  current: 1,
});

const inputTitle = ref("");

const loadData = async () => {
  try {
    const res = await getQuestionList(searchParams.value);
    dataList.value = res.data.records;
    total.value = res.data.total;
  } catch (error) {
    ElMessage.error("获取题目列表失败");
  }
};

onMounted(() => {
  inputTitle.value = searchParams.value.title;
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

const onTitleBlur = () => {
  searchParams.value.title = inputTitle.value;
  searchParams.value.current = 1; // 失焦搜索时重置到第一页
  loadData();
};

const onTagsChange = () => {
  searchParams.value.current = 1; // 标签变化时重置到第一页
  loadData();
};

const router = useRouter();

const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

const store = useStore();
</script>

<style scoped>
#homeView {
  max-width: 1280px;
  margin: 0 auto;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
