<template>
  <div>
    <Dialog
      v-model:visible="visible"
      modal
      header="Creating a new Board."
      :style="{ width: '25rem' }"
    >
      <div class="mb-4">Enter the title of the new board.</div>
      <FloatLabel variant="in">
        <InputText id="in_label" v-model="title" variant="filled" />
        <label for="in_label">Title</label>
      </FloatLabel>
      <div class="flex justify-end gap-2 mt-4">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="visible = false"
        ></Button>
        <Button type="button" label="Save" @click="createBoard()"></Button>
      </div>
    </Dialog>
    <div class="card flex flex-wrap gap-2">
      <Button
        @click="visible = true"
        icon="pi pi-plus"
        label="New Board"
        outlined
      ></Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const visible = ref(false);
const title = ref("");

const emit = defineEmits<{
  (e: "add", payload: string): void;
}>();

function createBoard() {
  emit("add", title.value);
  visible.value = false;
}
</script>

<style scoped>
.dialog-description {
}

.dialog-container {
  margin-top: 2rem;
}
</style>
