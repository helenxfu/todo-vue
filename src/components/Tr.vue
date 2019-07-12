<template>
  <tr>
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
        <EditModal :index="index" :todo="todo" :class="{hideMe : hidden}" @close="toggleModal" />
      </div>
    </td>
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
    dateRemain() {
      const countDown =
        (new Date(this.todo.limit) - new Date(this.$store.getters.dateToday)) /
        86400000;
      return countDown > 0
        ? countDown + " " + this.$t("table.days")
        : countDown === 0
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
td {
  border: 1px solid rgb(221, 221, 221);
  padding: 2px 2px;
}
.buttonTd {
  padding: 0;
}
.buttonWrapper {
  display: flex;
  align-items: stretch;
  justify-content: center;
}
button {
  padding: 4px;
  border-radius: 4px;
}
button:hover {
  background-color: rgb(220, 193, 255);
}
.hideMe {
  display: none;
}
.rightAlign {
  text-align: right;
}
.checkIcon {
  width: 15px;
}
.pointer {
  cursor: pointer;
  padding-left: 5px;
}
</style>