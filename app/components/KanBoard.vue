<script lang="ts" setup>
import { nanoid } from "nanoid";
import type { Column, Task, ID } from "#shared/types";
import draggable from "vuedraggable";
import { useKeyModifier, useLocalStorage, onKeyStroke } from "@vueuse/core";
import { toRaw } from "vue";


const props = defineProps<{ 
  boardId: ID,
  title: string,
  focused: boolean,
 }>();

const controlState = useKeyModifier("Control", {
  events: ["keydown", "keyup"],
});

const onFocusAndKeyDown = () => controlState.value && props.focused

onKeyStroke("z", () => {
  if (onFocusAndKeyDown()) undo();
});

onKeyStroke("y", () => {
  if (onFocusAndKeyDown()) redo();
});

onKeyStroke("b", () => {
  if (onFocusAndKeyDown()) createColumn();
});

const initialColumns: Column[] = [
  {
    id: nanoid(),
    title: "Backlog",
    tasks: [],
    color: "664c66",
  },
  {
    id: nanoid(),
    title: "To Do",
    tasks: [],
    color: "7700ff",
  },
  {
    id: nanoid(),
    title: "In Progress",
    tasks: [],
    color: "ffaa00",
  },
  {
    id: nanoid(),
    title: "Done",
    tasks: [],
    color: "18c92a",
  },
];

const columns = useLocalStorage<Column[]>("kanBoard" + props.boardId, initialColumns);
const undoStack = ref<Array<string>>([]);
const redoStack = ref<Array<string>>([]);

function saveState() {
  const currentState = JSON.parse(JSON.stringify(toRaw(columns.value)));

  const lastState = undoStack.value[undoStack.value.length - 1];

  if (JSON.stringify(currentState) !== JSON.stringify(lastState)) {
    undoStack.value.push(currentState);
  }
}

function undo() {
  if (undoStack.value.length === 0) return;
  undoStack.value.pop();
  const lastState = undoStack.value.pop();
  if (lastState) {
    const currentState = JSON.parse(JSON.stringify(toRaw(columns.value)));
    redoStack.value.push(currentState);

    columns.value = lastState;
  }
}

function redo() {
  if (redoStack.value.length === 0) return;

  const nextState = redoStack.value.pop();
  if (nextState) {
    const currentState = JSON.parse(JSON.stringify(toRaw(columns.value)));
    undoStack.value.push(currentState);

    columns.value = nextState;
  }
}

watch(
  () => columns.value,
  () => saveState(),
  { deep: true, immediate: true }
);

const alt = useKeyModifier("Alt");

function createColumn() {
  const column: Column = {
    id: nanoid(),
    title: "",
    tasks: [],
    color: "000000",
  };
  columns.value.push(column);
  nextTick(() => {
    (
      document.querySelector(
        ".p-card:last-of-type .title-input"
      ) as HTMLInputElement
    ).focus();
  });
}

const createTask = (task: Task, columnId: Column['id']) => {
  var column = columns.value.filter((column: Column) => column.id === columnId)[0];
  if (column && !column.tasks) {
    columns.value = columns.value.map((c: Column) => {
      if (c.id === columnId) {
        c.tasks = [];
      }
      return c;
    });
  }
  column.tasks.push(task);
};



onMounted(() => {
  const lastState = undoStack.value[undoStack.value.length - 1];
  if (lastState) {
    columns.value = lastState;
  }
});
</script>

<template>
  <div>
    <div class="board shadow-lg">
      <Panel class="panel">
        <button @click="$emit('delete', boardId)"><i class="pi pi-trash text-[var(--p-primary-500)] mr-2"></i></button>
        <slot></slot>
        <draggable
          v-model="columns"
          :group="{ name: 'tasks' }"
          item-key="id"
          :animation="150"
          handle=".drag-handle"
          :delay="50"
          :delay-on-touch-only="true"
          class="draggable"
        >
          <template #item="{ element: column }: { element: Column }">
            <Card
              class="card"
            >
              <template #title>
                <DragHandle
                  class="drag-handle"
                  :style="{ backgroundColor: '#' + column.color }"
                >
                  <header class="column">
                    <InputGroup class="flex">
                      <div
                        class="move-column"
                      >
                        <i class="pi pi-bars" style="font-size: 1rem"></i>
                      </div>
                      <InputText
                        class="title-input"
                        unstyled
                        @keyup.enter="
                          ($event.target as HTMLInputElement).blur()
                        "
                        @keydown.backspace="
                          column.title === ''
                            ? (columns = columns.filter(
                                (c: Column) => c.id !== column.id
                              ))
                            : null
                        "
                        type="text"
                        v-model="column.title"
                      />
                    </InputGroup>
                  </header>
                </DragHandle>
              </template>
              <template #content>
                <draggable
                  v-model="column.tasks"
                  :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
                  item-key="id"
                  handle=".drag-handle"
                  :animation="150"
                  class="min-h-[100px]"
                >
                  <template #item="{ element: task }: { element: Task }">
                    <div>
                      <KanBoardTask
                        :task="task"
                        :key="task.id"
                        @delete="
                          column.tasks = column.tasks.filter(
                            (t) => t.id !== $event
                          )
                        "
                      />
                    </div>
                  </template>
                </draggable>
              </template>
              <template #footer>
                <footer>
                  <NewTask @add="createTask($event, column.id)" />
                  <div class="absolute bottom-2 right-2">
                    <ColorPicker v-model="column.color" class="rounded-full" />
                  </div>
                </footer>
              </template>
            </Card>
          </template>
        </draggable>
      </Panel>
    </div>
  </div>
</template>

<style scoped>
.board {
  @apply flex flex-col md:flex-row items-start gap-[2px] h-full w-full overflow-x-auto;
}

.panel {
  @apply w-full min-w-max relative;
}

.draggable {
  @apply flex flex-col md:flex-row gap-4 items-start h-full;
}

.card {
  @apply min-w-[350px] relative shadow-sm shadow-[#858585] dark:bg-[#1c1c1c] bg-gray-100 ;
}

.drag-handle {
  @apply w-full flex justify-center items-center rounded-t-md;
}

.move-column {
  @apply px-2 h-10 flex justify-center items-center text-white w-14;
}

.title-input {
  @apply bg-transparent rounded px-1 font-semibold text-left text-white w-full;
}
</style>
