<template>
  <table>
    <tr>
      <th class="centering">{{ $t('table.status') }}</th>
      <th>{{ $t('table.titleCategory') }}</th>
      <th>{{ $t('table.titleName') }}</th>
      <th>{{ $t('table.titleLimit') }}</th>
      <th class="rightAlign">{{ $t('table.titleRemain') }}</th>
      <th></th>
    </tr>
    <Tr v-for="todo in todos" :todo="todo" :key="todo.id" @delete-todo="deleteTodo" />
  </table>
</template>

<script>
import Tr from "./Tr";

import { mapState } from "vuex";

export default {
  name: "TaskTable",
  computed: mapState(["todos"]),
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