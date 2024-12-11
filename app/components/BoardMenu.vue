<template>
  <div>
    <Menu :model="items" class="w-full md:w-60 h-full">
      <template #start>
        <div class="text-2xl mx-2 mt-2">
          Kan<span class="text-[var(--p-primary-500)]">Board</span>
        </div>
      </template>
      <template #item="{ item, props }">
        <a v-ripple class="flex items-center" v-bind="props.action">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
            <Badge v-if="item.shortcut" class="ml-auto text-white">{{ item.shortcut }}</Badge>
        </a>
    </template>
    </Menu>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["undo", "redo", "new-column"]);

const items = ref([
  {
    separator: true,
  },
  {
    label: "Undo",
    icon: "pi pi-undo",
    shortcut: "Ctrl + Z",
  },
  {
    label: "Redo",
    icon: "pi pi-refresh",
    shortcut: "Ctrl + Y",
  },
  {
    label: "Add Column",
    icon: "pi pi-plus",
    shortcut: "Ctrl + B",
  },
  {
    label: "Del Column",
    icon: "pi pi-minus",
    shortcut: "Backspace",
  },
  {
    label: "Del task",
    icon: "pi pi-minus",
    shortcut: "Click + X",
  },
  {
    label: "Copy task",
    icon: "pi pi-minus",
    shortcut: "Alt + Click",
  },


]);
</script>

<style></style>
