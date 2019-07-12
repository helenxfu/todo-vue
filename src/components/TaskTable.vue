<template>
  <table>
    <tr>
      <th @click="handleFilter('priority')">
        {{$t('table.status')}}
        <span
          v-bind:class="{active:isActive}"
          v-on:click="isActive=!isActive"
        >&#9655;</span>
      </th>
      <th @click="handleFilter('category')">
        {{$t('table.titleCategory')}}
        <span>&#9655;</span>
      </th>
      <th @click="handleFilter('title')">
        {{$t('table.titleName')}}
        <span>&#9655;</span>
      </th>
      <th @click="handleFilter('limit')">
        {{$t('table.titleLimit')}}
        <span>&#9655;</span>
      </th>
      <th class="rightAlign" @click="handleFilter('limit')">
        {{$t('table.titleRemain')}}
        <span>&#9655;</span>
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
  computed: mapState(["todos"]),
  components: {
    Tr
  },
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    ...mapActions(["filterFunction"]),
    handleFilter(text) {
      this.filterFunction(text);
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

tr:nth-child(even) {
  background-color: rgb(245, 235, 252);
}
tr:hover {
  background-color: rgb(230, 208, 235) !important;
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
.active {
  transform: rotate(90deg);
  transition-duration: 1s;
  transition-timing-function: linear;
}
</style>