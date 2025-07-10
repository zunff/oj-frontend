<template>
  <div id="userInfoView">
    <el-card class="profile-card" v-if="userInfo">
      <div class="profile-header">
        <div class="profile-info">
          <h2>
            <el-input
              v-model="userInfo.userName"
              @blur="handleEditEnd"
              class="editable-input"
            />
          </h2>
          <p style="margin-left: 10px">{{ userInfo.userRoleStr }}</p>
        </div>
      </div>

      <el-card>
        <el-form :model="userInfo" label-width="120px">
          <el-form-item label="邮箱">
            <el-input
              v-model="userInfo.email"
              @blur="handleEditEnd"
              class="editable-input"
            />
          </el-form-item>
          <el-form-item label="账号">
            <el-input
              v-model="userInfo.userAccount"
              @blur="handleEditEnd"
              class="editable-input"
            />
          </el-form-item>
          <el-form-item label="AccessKey">
            <el-input
              v-model="userInfo.accessKey"
              readonly
              class="copyable-input"
            >
              <template #append>
                <el-button @click="copyToClipboard(userInfo.accessKey)">
                  复制
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="SecretKey">
            <el-input
              v-model="userInfo.secretKey"
              type="password"
              readonly
              show-password
            />
          </el-form-item>
        </el-form>
      </el-card>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getUserById, updateUser, getCurrentUser, type UserVO } from "@/api";
import { ElMessage } from "element-plus";
import { ref, defineProps, withDefaults, onMounted } from "vue";
import { useStore } from "vuex";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const store = useStore();

const userInfo = ref<UserVO>();

const loadData = async () => {
  try {
    const res = await getUserById(props.id);
    userInfo.value = res.data;
  } catch (error) {
    ElMessage.error("获取我的信息失败");
  }
};

const handleEditEnd = async () => {
  try {
    await updateUser(userInfo.value as any);
    await loadData();
    // 直接请求当前用户信息并同步本地和store
    const userRes = await getCurrentUser();
    localStorage.setItem("user_login_info", JSON.stringify(userRes.data ?? {}));
    store.commit("user/updateUser", userRes.data);
    ElMessage.success("更新成功");
  } catch (error) {
    ElMessage.error("更新我的信息失败");
  }
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    ElMessage.success("复制成功");
  } catch (error) {
    ElMessage.error("复制失败");
  }
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.profile-card {
  width: 800px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile-info h2 {
  margin: 0;
}

.editable-input {
  border: none;
  background: transparent;
}

.editable-input:hover {
  background: var(--el-fill-color-light);
}

.copyable-input {
  cursor: pointer;
}

.copyable-input:hover {
  background: var(--el-fill-color-light);
}
</style>
