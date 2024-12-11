<script setup lang="ts">
import type { Task } from "#shared/types";
import { nanoid } from "nanoid";

const emit = defineEmits<{
  (e: "add", payload: Task): void;
}>();

const focused = ref(false);
const title = ref("");

function createTask(e: Event) {
  if (title.value.trim()) {
    e.preventDefault();
    emit("add", {
      title: title.value.trim(),
      createdAt: new Date(),
      id: nanoid(),
      color: '000000'
    } as Task);
  }

  title.value = "";
}
</script>
<template>
  <div>
    <Textarea
      v-model="title"
      @keydown.tab="createTask"
      @keyup.enter="createTask"
      :unstyled="!focused"
      class="focus:shadow resize-none rounded w-full border-none bg-transparent p-2 cursor-pointer "
      :class="{
        'h-10': !focused,
        'h-20': focused,
      }"
      style="outline: none !important"
      @focus="focused = true"
      @blur="focused = false"
      :placeholder="!focused ? '+ Add A Card' : 'Enter a title for this card'"
    />
  </div>
</template>