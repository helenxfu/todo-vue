<template>
  <tr :class="statusClass">
    <td @click="handleComplete">
      <div class="checkboxContainer">
        <svg
          class="checkIcon"
          :class="[todo.completed ? 'check' : 'uncheck']"
          x="0px"
          y="0px"
          viewBox="0 0 15 15"
        >
          <rect width="15" height="15" />
          <polyline v-if="todo.completed" points="2.4,8.3 5.7,11.9 12.3,3.5 " />
        </svg>
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
          <svg style="width:16px" viewBox="0 0 16.13 18.72">
            <title>pencil</title>
            <rect
              class="pencil"
              x="7.44"
              y="3.83"
              width="4.61"
              height="12.31"
              rx="0.15"
              transform="translate(6.64 -4.56) rotate(39.52)"
            />
            <rect
              class="pencil"
              x="12.91"
              y="2.15"
              width="4.61"
              height="2.38"
              rx="0.15"
              transform="translate(3.67 -9.56) rotate(39.52)"
            />
            <path
              class="pencil"
              d="M2.36,19l3.88-2a0,0,0,0,0,0-.06L3.57,14.73a0,0,0,0,0-.06,0l-1.2,4.19S2.33,19,2.36,19Z"
              transform="translate(-1.93 -0.64)"
            />
          </svg>
        </button>
        <button @click="handleDelete">
          <svg style="width: 16px" viewBox="0 0 18.17 18.17">
            <title>cross</title>
            <line class="cross" x1="1.5" y1="1.5" x2="16.67" y2="16.67" />
            <line class="cross" x1="1.5" y1="16.67" x2="16.67" y2="1.5" />
          </svg>
        </button>
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
      this.$store.dispatch("deleteTodo", this.index);
    },
    handleComplete() {
      this.$store.dispatch("toggleComplete", this.index);
    }
  }
};
</script>
