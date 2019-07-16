<template>
  <tr :class="priorityClass" class="trContainer">
    <td class="pointer" @click="handleComplete">
      <img v-if="todo.completed" class="checkIcon" src="../assets/svg/check.svg" alt />
      <img v-else class="checkIcon" src="../assets/svg/uncheck.svg" alt />
      {{priorityHandler}}
    </td>
    <td>{{todo.category}}</td>
    <td>{{todo.title}}</td>
    <td>{{todo.limit}}</td>
    <td class="rightAlign">{{dateRemain}}</td>
    <td class="buttonTd">
      <div class="buttonWrapper">
        <button @click="toggleModal">{{$t('table.buttonEdit')}}</button>
        <button @click="handleDelete">X</button>
      </div>
    </td>
    <EditModal :index="index" :todo="todo" :class="{hideMe : hidden}" @close="toggleModal" />
  </tr>
</template>

<script>
import EditModal from "./EditModal";

export default {
  name: "Tr",
  props: {
    todo: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  components: {
    EditModal
  },
  data() {
    return {
      hidden: true
    };
  },
  computed: {
    priorityHandler() {
      return this.todo.priority === 0
        ? this.$t("table.priorityLow")
        : this.todo.priority === 1
        ? this.$t("table.priorityMid")
        : this.$t("table.priorityHigh");
    },
    countDown() {
      return (
        (new Date(this.todo.limit) - this.$store.state.todayRendered) / 86400000
      );
    },
    priorityClass() {
      if (this.todo.completed) {
        return "completed";
      } else if (this.countDown < 0) {
        return "passed";
      } else {
        return this.todo.priority === 0
          ? "priorityLow"
          : this.todo.priority === 1
          ? "priorityMid"
          : "priorityHigh";
      }
    },
    dateRemain() {
      return this.countDown > 0
        ? this.countDown + " " + this.$t("table.days")
        : this.countDown === 0
        ? this.$t("countDown.today")
        : this.$t("countDown.passed");
    }
  },
  methods: {
    toggleModal() {
      this.hidden = !this.hidden;
    },
    handleDelete() {
      this.$store.dispatch("deleteTodo", this.index);
    },
    handleComplete() {
      this.$store.dispatch("toggleComplete", this.index);
    }
  }
};
</script>

<style scoped>
</style>