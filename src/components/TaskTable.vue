<template>
  <table>
    <tr>
      <th class="centering">Status</th>
      <th>Category</th>
      <th>Task Name</th>
      <th>Time Limit</th>
      <th class="rightAlign">Remaining</th>
      <th></th>
    </tr>
    <Tr v-for="todo in todos" :todo="todo" :key="todo.id" @delete-todo="deleteTodo"/>
  </table>
</template>

<script>
import Tr from "./Tr";

export default {
  name: "TaskTable",
  props: {
    todos: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Tr
  },
  methods: {
    deleteTodo(id) {
      this.$emit("delete-todo", id);
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
th {
  background-color: rgb(116, 45, 45);
  color: white;
  font-weight: normal;
  border-right: 1px solid rgb(221, 221, 221);
  padding: 5px 2px;
}

tr:nth-child(even) {
  background-color: rgb(245, 235, 252);
}
tr:hover {
  background-color: rgb(230, 208, 235) !important;
}
.centering {
  text-align: center;
}
.rightAlign {
  text-align: right;
}
</style>