<template>
  <div class="menu">
    <h1>Fruit Bowl</h1>
    <h2>Task Tracker</h2>
    <div class="status">
      <h3>
        Tast Count
        <span>{{todos.length}}</span>
      </h3>
      <h3>
        Remaining
        <span>{{todos.length - todoCompleted}}</span>
      </h3>
      <h3>
        Overdue
        <span :class="{warning : overdue > 0}">{{overdue}}</span>
      </h3>
      <h3>
        Completed
        <span>{{todoCompleted}}</span>
      </h3>
      <h3>
        Completion Rate
        <span>{{completionRate}}</span>
      </h3>
    </div>
    <h4>Tasks</h4>
    <button @click="$emit('delete-completed')">Delete Completed</button>
    <button @click="$emit('delete-all')">Delete All</button>
    <div>
      <h4>Themes</h4>
      <button>Classic Mode</button>
      <button>Dark Mode</button>
      <button>Light Mode</button>
      <button>Vibrant Mode</button>
      <button>Monotone Mode</button>
    </div>

    <div class="links">
      <p>links here</p>
    </div>
    <p class="credit">&#169; Starcloud</p>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {
    todos: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    todoCompleted() {
      return this.todos.filter(x => x.completed).length;
    },
    completionRate() {
      return this.todos.length == 0
        ? ""
        : Math.round((this.todoCompleted / this.todos.length) * 100) + "%";
    },
    overdue() {
      return 0;
    }
  }
};
</script>

<style scoped>
.menu {
  width: 200px;
  background-color: rgb(248, 241, 253);
  text-align: center;
  padding: 20px;
  min-height: 100vh;
}
button {
  display: block;
  margin: 5px auto;
  border-radius: 7px;
  background-color: rgb(248, 241, 253);
  border: 1px solid rgb(224, 200, 224);
}
button:hover {
  background-color: rgb(228, 212, 240);
}
h1 {
  font-size: 25px;
}
h2 {
  font-size: 20px;
}
.status {
  margin: 5px;
}
h3 {
  font-size: 18px;
  position: relative;
  margin: 20px;
}
span {
  position: absolute;
  bottom: -5px;
  right: 0;
  font-size: 40px;
  color: rgba(153, 50, 204, 0.6);
}
.warning {
  color: rgba(255, 0, 0, 0.4);
}
h4 {
  margin-top: 20px;
  font-size: 16px;
}
.links {
  margin-top: 10px;
}
.credit {
  margin-top: 10px;
}
</style>