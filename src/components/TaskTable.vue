<template>
  <table>
    <thead>
      <tr>
        <!-- 'remain' and Limit have the same ordering, therefore the same filter -->
        <th
          v-for="(tableHeading, index) in tableHeadings"
          :key="index"
          @click="handleFilter(tableHeading.filter)"
        >
          <div class="thContainer">
            <div>{{$t(tableHeading.text)}}</div>
            <div class="triangle" :class="renderClass(tableHeading.renderClass)">&#9655;</div>
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
  },
  data() {
    return {
      tableHeadings: [
        { filter: "priority", text: "table.status", renderClass: "priority" },
        {
          filter: "category",
          text: "table.titleCategory",
          renderClass: "category"
        },
        { filter: "title", text: "table.titleName", renderClass: "title" },
        { filter: "limit", text: "table.titleLimit", renderClass: "limit" },
        { filter: "limit", text: "table.titleRemain", renderClass: "limit" }
      ]
    };
  }
};
</script>