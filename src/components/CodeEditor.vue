<template>
  <div id="code-editor" ref="codeEditorRef" :style="editorStyles" />
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import {
  onMounted,
  ref,
  toRaw,
  withDefaults,
  defineProps,
  watch,
  computed,
} from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language: string;
  handleChange: (v: string) => void;
  minHeight: string;
  maxHeight: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  },
  minHeight: () => "73vh",
  maxHeight: () => "",
});

// 创建一个计算属性来返回样式对象
const editorStyles = computed(() => ({
  minHeight: props.minHeight, // 使用 props 中的 minHeight
  maxHeight: props.maxHeight,
}));

const codeEditorRef = ref();
const codeEditor = ref();
// const value = ref(props.value);
watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  setEditor();
  //编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});

const setEditor = () => {
  //Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: false,
    },
    readOnly: false, //是否只读
    theme: "vs", // vs, hc-black, or vs-dark
    //lineNumbers:"off",
    //roundedSelection:false,
    //scrollBeyondLastLine:false,
  });
};
</script>

<style scoped>
#code-editor {
  /*border: 1px solid #e0e0e0;*/
}
</style>
