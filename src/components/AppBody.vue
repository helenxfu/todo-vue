<template>
  <div class="bodyContainer">
    <Header />
    <AddNewTask />
    <EmptyTask v-if="$store.getters.todoLength === 0" />
    <div v-else class="tableContainer">
      <TaskTable />
    </div>
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