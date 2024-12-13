<script lang="ts" setup>
import type { Task, ID } from "#shared/types";
import { onKeyStroke } from "@vueuse/core";

const props = defineProps<{ task: Task }>();

const emit = defineEmits<{ (e: "delete", payload: ID): void }>();

const focused = ref(false);
onKeyStroke("x", () => {
  if (focused.value) emit("delete", props.task.id);
});
</script>

<template>
  <div
    :title="new Date(task.createdAt).toLocaleDateString()"
    class="task p-2 mb-2 rounded shadow-sm w-fit flex items-center gap-2"
    :style="{
      backgroundColor: `#${task.tasks ? task.color : null}`,
      color: task.tasks ? 'white' : null,
    }"
    @focus="focused = true"
    @blur="focused = false"
    tabindex="0"
  >
    <DragHandle>
      <i
        class="pi pi-bars"
        :style="{ backcolor: `#${task.color}` }"
        style="font-size: 1rem"
      ></i>
    </DragHandle>
    <span>{{ task.title }}</span>
  </div>
</template>

<style>
.sortable-drag .task {
  @apply bg-blue-100 rotate-3;
  /* opacity: 0.5; */
}

.sortable-ghost .task {
  @apply relative;
}

.sortable-ghost .task::after {
  content: "";
  @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-300 rounded shadow-md;
}

.task:focus,
.task:focus-visible {
  @apply ring-1 ring-black ring-opacity-25;
}
</style>
