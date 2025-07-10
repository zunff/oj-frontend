<template>
  <div class="tag-input">
    <el-tag
      v-for="tag in modelValue"
      :key="tag"
      class="mx-1"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-model="inputValue"
      class="input-new-tag"
      :placeholder="placeholder"
      @keyup.enter="handleInputConfirm"
      :disabled="disabled"
      style="width: 170px; min-width: 80px"
      clearable
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps<{
  modelValue: string[];
  placeholder?: string;
  disabled?: boolean;
}>();
const emits = defineEmits(["update:modelValue", "change"]);

const inputValue = ref("");

const handleClose = (tag: string) => {
  const tags = props.modelValue.filter((t) => t !== tag);
  emits("update:modelValue", tags);
  emits("change", tags);
};

const handleInputConfirm = () => {
  let val = inputValue.value.trim();
  if (val && !props.modelValue.includes(val)) {
    const tags = [...props.modelValue, val];
    emits("update:modelValue", tags);
    emits("change", tags);
  }
  inputValue.value = "";
};
</script>

<style scoped>
.tag-input {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 32px;
  gap: 6px;
}
.mx-1 {
  margin-right: 0px;
  margin-bottom: 0px;
}
.input-new-tag {
  flex: 1;
  min-width: 80px;
  max-width: 200px;
}
</style>
