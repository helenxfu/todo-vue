<template>
  <div class="bodyContainer">
    <Header/>
    <AddNewTask :newId="lastItem" @add-todo="transferAdd"/>
    <EmptyTask v-if="todos.length === 0"/>
    <TaskTable v-else :todos="todos" @delete-todo="transferData"/>
  </div>
</template>

<script>
import Header from "./Header";
import AddNewTask from "./AddNewTask";
import EmptyTask from "./EmptyTask";
import TaskTable from "./TaskTable";

export default {
  name: "AppBody",
  components: {
    Header,
    AddNewTask,
    EmptyTask,
    TaskTable
  },
  props: {
    todos: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    lastItem() {
      let last = 0;
      if (this.todos.length > 0) {
        last = this.todos[this.todos.length - 1].id + 1;
      }
      return last;
    }
  },
  methods: {
    transferData(id) {
      this.$emit("delete-todo", id);
    },
    transferAdd(newTodo) {
      this.$emit("add-todo", newTodo);
    }
  }
};
</script>

<style scoped>
.bodyContainer {
  padding: 30px;
  background-color: rgb(254, 255, 219);
}
</style>