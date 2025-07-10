<!-- LoadingOverlay.vue -->
<template>
  <div v-if="isLoading" class="loading-container">
    <div class="loader"></div>
    <p class="loader-text">{{ text }}</p>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, watch } from "vue";

export default {
  name: "LoadingOverlay",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const text = ref("");

    let timerId = null;

    watch(
      () => props.isLoading,
      () => {
        if (props.isLoading) {
          timerId = setTimeout(() => {
            text.value = "T_T 前端优化还没学会\n请耐心等待...";
          }, 3000);
        } else {
          text.value = "";
          clearTimeout(timerId);
        }
      }
    );

    return {
      text,
    };
  },
};
</script>

<style scoped>
.loading-container {
  position: fixed;
  top: 50%; /* 垂直居中（相对于视口） */
  left: 50%; /* 水平居中（相对于视口） */
  transform: translate(-50%, -50%); /* 相对于自身进行平移以居中 */
  width: 200px; /* 指定宽度，根据需要调整 */
  height: 500px; /* 指定高度，根据需要调整 */
  text-align: center; /* 确保容器内的文本也水平居中 */
  display: flex; /* 使用Flexbox进行垂直居中 */
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: center; /* 垂直居中子元素 */
  align-items: center;
}

/* 加载器文本样式 */
.loader-text {
  min-height: 30px;
  text-align: center; /* 水平居中 */
  margin-top: 10px; /* 调整这个值来控制文本与圆圈之间的距离 */
  font-size: 14px; /* 根据需要调整字体大小 */
  color: #0096fa; /* 根据需要调整文本颜色 */
  white-space: pre-line;
}

/* 定义旋转动画 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 应用动画到 .loader 类 */
.loader {
  /* 其他样式，比如尺寸、边框、颜色等 */
  position: relative; /* 允许内部元素进行绝对定位 */
  width: 50px;
  height: 50px;
  margin: 50px auto; /* 居中显示 */
  border-radius: 50%;
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-right: 4px solid transparent;
  border-bottom: 4px solid transparent;
  animation: spin 2s linear infinite; /* 应用 spin 动画，持续 2 秒，匀速旋转，无限次 */
}

/* 加载器中心的图片 */
.loader::before {
  content: "";
  position: absolute; /* 绝对定位图片 */
  top: 50%; /* 垂直居中 */
  left: 50%; /* 水平居中 */
  transform: translate(
    -50%,
    -50%
  ); /* 使用transform属性进一步调整位置，确保完全居中 */
  width: 20px; /* 图片宽度，可根据实际图片大小调整 */
  height: 20px; /* 图片高度，可根据实际图片大小调整 */
  background: url("@/assets/sheep.png") no-repeat center center / cover; /* 替换为你的图片URL */
}
</style>
