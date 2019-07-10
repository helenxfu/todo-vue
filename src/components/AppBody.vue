<template>
  <div class="bodyContainer">
    <Header />
    <AddNewTask />
    <EmptyTask v-if="$store.getters.todoLength === 0" />
    <TaskTable v-else />
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
  }
};
</script>

<style scoped>
.bodyContainer {
  padding: 30px;
  background-color: rgb(254, 250, 255);
}
</style>