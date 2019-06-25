<template>
  <table>
    <tr>
      <th>Status</th>
      <th>Category</th>
      <th>Task Name</th>
      <th>Time Limit</th>
      <th>Remaining</th>
      <th></th>
    </tr>
    <tr v-for="todo in todos" :key="todo.id">
      <td class="centering">
        <input type="checkbox" name="completed">
        {{todo.priority}}
      </td>
      <td>{{todo.category}}</td>
      <td>{{todo.title}}</td>
      <td>{{todo.limit}}</td>
      <td>{{todo.id}} Days</td>
      <td class="centering">
        <button>Edit</button>
        <button @click="$emit('delete-todo', todo.id)">X</button>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "TaskTable",
  props: {
    todos: {
      type: Array,
      default: () => []
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
  padding: 5px 0;
}
td {
  border: 1px solid rgb(221, 221, 221);
  padding: 2px 0;
}
tr:nth-child(even) {
  background-color: rgb(245, 235, 252);
}
tr:hover {
  background-color: rgb(230, 208, 235) !important;
}
button:hover {
  background-color: rgb(220, 193, 255);
}
.centering {
  text-align: center;
}
</style>