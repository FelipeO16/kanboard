<template>
  <div class="h-screen flex">
    <BoardMenu />
    <div class="p-4 flex flex-col gap-8 w-[calc(100%-15rem)]">
      <NewBoard @add="createBoard" />
      <Tabs v-model:value="focused" v-if="hasBoard">
        <TabList>
          <draggable
            v-model="boards"
            :group="{ name: 'boards' }"
            item-key="id"
            :animation="150"
            handle=".drag-handle"
            :delay="50"
            :delay-on-touch-only="true"
            class="flex"
          >
            <template #item="{ element: board }: { element: Board }">
              <DragHandle>
                <Tab
                  :key="board.id"
                  :value="board.id"
                  >{{ board.title }}</Tab
                >
              </DragHandle>
            </template>
          </draggable>
        </TabList>
        <TabPanels>
          <TabPanel v-for="board in boards" :key="board.id" :value="board.id">
            <KanBoard
              :key="board.id"
              :boardId="board.id"
              :title="board.title"
              :focused="focused == board.id"
              @delete="deleteBoard"
            >
              <InputText
                class="title-input"
                unstyled
                @keyup.enter="($event.target as HTMLInputElement).blur()"
                @keydown.backspace="
                  board.title === '' ? deleteBoard(board.id) : null
                "
                type="text"
                v-model="board.title"
              />
            </KanBoard>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import "primeicons/primeicons.css";
import { nanoid } from "nanoid";
import draggable from "vuedraggable";
import { useLocalStorage } from "@vueuse/core";
import type { Board } from "#shared/types";

const initialBoards: Array<Board> = [
  {
    id: nanoid(),
    title: "KanBoard",
  },
];

const boards = useLocalStorage<Board[]>("boards", initialBoards);
const updateFocused = () =>
  (focused.value = boards.value[boards.value.length - 1].id);
const hasBoard = computed(() => boards.value.length > 0);
const focused = ref("");

const createBoard = (title: string) => {
  boards.value.push({
    id: nanoid(),
    title,
  });
  updateFocused();
};

const deleteBoard = (boardId: Board["id"]) => {
  boards.value = boards.value.filter((board: Board) => board.id !== boardId);
  localStorage.removeItem("kanBoard" + boardId);
  if (hasBoard.value) {
    updateFocused();
    return;
  }
  createBoard("KanBoard");
  updateFocused();
};

onMounted(() => {
  if (!hasBoard.value) {
    createBoard("KanBoard");
    return;
  }
  updateFocused();
});
</script>

<style scoped>
.title-input {
  @apply text-[1.2rem] font-medium my-4 bg-transparent;
}
</style>
