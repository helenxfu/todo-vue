<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(tableHeading, index) in tableHeadings"
          :key="index"
          @click="handleFilter(tableHeading.filter)"
        >
          <div class="thContainer">
            <div>{{$t(tableHeading.text)}}</div>
            <div class="triangle" :class="renderClass(tableHeading.filter)">&#9655;</div>
          </div>
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <Tr v-for="(todo, index) in renderTodos" :todo="todo" :index="index" :key="index" />
    </tbody>
  </table>
</template>

<script>
import Tr from "./Tr";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "TaskTable",
  computed: {
    ...mapState(["filterBy", "reverse"]),
    ...mapGetters(["renderTodos"])
  },
  components: {
    Tr
  },
  methods: {
    ...mapActions(["filterFunction"]),
    handleFilter(filter) {
      this.filterFunction(filter);
    },
    renderClass(filter) {
      if (this.filterBy[filter] && this.reverse) {
        return "reversed";
      } else if (this.filterBy[filter]) {
        return "activate";
      }
      return "deactivate";
    }
  },
  data() {
    return {
      // 'remain' and Limit have the same ordering, therefore the same filter
      tableHeadings: [
        { filter: "priority", text: "table.status" },
        { filter: "category", text: "table.titleCategory" },
        { filter: "title", text: "table.titleName" },
        { filter: "limit", text: "table.titleLimit" },
        { filter: "limit", text: "table.titleRemain" }
      ]
    };
  }
};
</script>