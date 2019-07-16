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