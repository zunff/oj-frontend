<template>
  <div id="basicLayout">
    <el-container style="min-height: 100vh">
      <el-header class="header">
        <GlobalHeader />
      </el-header>
      <el-main class="content">
        <router-view />
      </el-main>
      <el-footer class="footer">Create By ZunF@2023</el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<style scoped>
#basicLayout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
  padding: 0;
  height: auto;
}

#basicLayout .content {
  padding: 20px;
}

#basicLayout .footer {
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding-top: 16px;
  height: auto;
}
</style>
