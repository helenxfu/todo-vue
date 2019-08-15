<template>
  <table>
    <thead>
      <tr>
        <th @click="handleFilter('priority')">
          <div class="thContainer">
            <div>{{$t('table.status')}}</div>
            <div class="triangle" :class="renderClass('priority')">&#9655;</div>
          </div>
        </th>
        <th @click="handleFilter('category')">
          <div class="thContainer">
            <div>{{$t('table.titleCategory')}}</div>
            <div class="triangle" :class="renderClass('category')">&#9655;</div>
          </div>
        </th>
        <th @click="handleFilter('title')">
          <div class="thContainer">
            <div>{{$t('table.titleName')}}</div>
            <div class="triangle" :class="renderClass('title')">&#9655;</div>
          </div>
        </th>
        <th @click="handleFilter('limit')">
          <div class="thContainer">
            <div>{{$t('table.titleLimit')}}</div>
            <div class="triangle" :class="renderClass('limit')">&#9655;</div>
          </div>
        </th>
        <th @click="handleFilter('limit')">
          <div class="thContainer">
            <div>{{$t('table.titleRemain')}}</div>
            <div class="triangle" :class="renderClass('limit')">&#9655;</div>
          </div>
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <Tr v-for="(todo, index) in todos" :todo="todo" :index="index" :key="index" />
    </tbody>
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