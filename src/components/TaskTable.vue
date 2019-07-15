<template>
  <table>
    <tr>
      <th @click="handleFilter('priority')">
        {{$t('table.status')}}
        <span :class="renderClass('priority')">&#9655;</span>
      </th>
      <th @click="handleFilter('category')">
        {{$t('table.titleCategory')}}
        <span :class="renderClass('category')">&#9655;</span>
      </th>
      <th @click="handleFilter('title')">
        {{$t('table.titleName')}}
        <span :class="renderClass('title')">&#9655;</span>
      </th>
      <th @click="handleFilter('limit')">
        {{$t('table.titleLimit')}}
        <span :class="renderClass('limit')">&#9655;</span>
      </th>
      <th class="rightAlign" @click="handleFilter('limit')">
        {{$t('table.titleRemain')}}
        <span :class="renderClass('limit')">&#9655;</span>
      </th>
      <th></th>
    </tr>
    <Tr v-for="(todo, index) in todos" :todo="todo" :index="index" :key="index" />
  </table>
</template>

<script>
import Tr from "./Tr";

import { mapState, mapActions } from "vuex";

export default {
  name: "TaskTable",
  computed: {
    ...mapState(["todos", "filterBy", "reverse"])
  },
  components: {
    Tr
  },
  methods: {
    ...mapActions(["filterFunction"]),
    handleFilter(text) {
      this.filterFunction(text);
    },
    renderClass(text) {
      if (this.filterBy[text] && this.reverse) {
        return "reversed";
      } else if (this.filterBy[text]) {
        return "activate";
      }
      return "deactivate";
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
  padding: 5px 18px 5px 2px;
  position: relative;
}
th:hover {
  background-color: rgb(161, 86, 86);
}
.rightAlign {
  text-align: right;
}
span {
  font-size: 10px;
  position: absolute;
  bottom: 7px;
  right: 5px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}
.activate {
  transform: rotate(90deg);
  transition-duration: 1s;
}
.reversed {
  transform: rotate(-90deg);
  transition-duration: 1s;
}
.deactivate {
  transform: rotate(0deg);
  transition-duration: 1s;
}
</style>