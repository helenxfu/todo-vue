<template>
  <tr :class="statusClass">
    <td @click="handleComplete">
      <div class="checkboxContainer">
        <CheckboxSVGIcon :completed="todo.completed" />
        <div :class="priorityClass" class="priorityTag">{{priorityHandler}}</div>
      </div>
    </td>
    <td>{{todo.category}}</td>
    <td>{{todo.title}}</td>
    <td>{{todo.limit}}</td>
    <td class="rightAlign">{{dateRemain}}</td>
    <td class="tdButtonCell">
      <div class="tdButtonWrapper">
        <button @click="toggleModal">
          <PencilSVGIcon />
        </button>
        <button @click="handleDelete">
          <CrossSVGIcon />
        </button>
      </div>
    </td>
    <BaseModal @close="toggleModal" :class="{hideMe : hidden}">
      <EditModal :index="index" :todo="todo" @close="toggleModal" />
    </BaseModal>
  </tr>
</template>

<script>
import BaseModal from "./BaseModal";
import EditModal from "./EditModal";
import PencilSVGIcon from "./SVG/PencilSVGIcon";
import CrossSVGIcon from "./SVG/CrossSVGIcon";
import CheckboxSVGIcon from "./SVG/CheckboxSVGIcon";

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
    BaseModal,
    EditModal,
    PencilSVGIcon,
    CrossSVGIcon,
    CheckboxSVGIcon
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
      const MS_IN_ONE_DAY = 1000 * 60 * 60 * 24;
      return (
        (new Date(this.todo.limit) - this.$store.state.today) / MS_IN_ONE_DAY
      );
    },
    priorityClass() {
      return this.todo.priority === 0
        ? "priorityLow"
        : this.todo.priority === 1
        ? "priorityMid"
        : "priorityHigh";
    },
    statusClass() {
      return this.todo.completed
        ? "completed"
        : this.countDown < 0
        ? "passed"
        : "";
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
      this.$store.dispatch("deleteTodo", this.todo.id);
    },
    handleComplete() {
      this.$store.dispatch("toggleComplete", {
        id: this.todo.id,
        completed: this.todo.completed
      });
    }
  }
};
</script>
