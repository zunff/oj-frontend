<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img class="logo" src="../assets/sheep.png" />
          <div class="title">OJ判题系统</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">Create By ZunF@2023</a-layout-footer>
    </a-layout>
  </div>
</template>

<script></script>

<style scoped>
#userLayout {
  text-align: center;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0% 0% / 100% 100%;
}

#userLayout .header {
  margin-top: 20px;
}

#userLayout .logo {
  width: 40px;
  height: 40px;
}

#userLayout .title {
  font-weight: bold;
}

#userLayout .content {
  padding: 20px;
}

#userLayout .footer {
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding-top: 16px;
}
</style>
