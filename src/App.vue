<template>
  <div class="mainContainer">
    <Menu @delete-completed="deleteCompleted" @delete-all="deleteAll" :todos="todos"/>
    <AppBody :todos="todos" class="mainBody" @delete-todo="deleteTodo" @add-todo="addTodo"/>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import AppBody from "./components/AppBody.vue";

export default {
  name: "app",
  components: {
    Menu,
    AppBody
  },
  data() {
    return {
      todos: [
        {
          id: 0,
          title: "Java intro",
          priority: 2,
          category: "Java",
          limit: "2019-08-14",
          completed: false
        },
        {
          id: 1,
          title: "Vue Todo",
          priority: 2,
          category: "Vue",
          limit: "2019-07-11",
          completed: false
        },
        {
          id: 2,
          title: "React course",
          priority: 1,
          category: "React",
          limit: "2019-07-22",
          completed: false
        },
        {
          id: 3,
          title: "React Calendar",
          priority: 1,
          category: "React",
          limit: "2019-07-30",
          completed: false
        },
        {
          id: 4,
          title: "CS50",
          priority: 0,
          category: "YouTube",
          limit: "2019-09-12",
          completed: false
        },
        {
          id: 5,
          title: "Illustrator crashcourse",
          priority: 0,
          category: "Adobe",
          limit: "2019-08-22",
          completed: false
        },
        {
          id: 6,
          title: "InDesign",
          priority: 0,
          category: "Adobe",
          limit: "2019-09-02",
          completed: false
        }
      ]
    };
  },
  methods: {
    deleteTodo(id) {
      this.todos = this.todos.filter(x => x.id !== id);
    },
    deleteAll() {
      if (confirm("Are you sure you want to delete all?")) {
        this.todos = [];
      }
    },
    deleteCompleted() {
      this.todos = this.todos.filter(x => !x.completed);
    },
    addTodo(newTodo) {
      this.todos.push(newTodo);
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
  font-size: 16px;
  color: rgb(34, 34, 34);
}
img {
  width: 100%;
}
input,
button {
  border: none;
  outline: none;
}
.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently supported by Chrome and Opera */
}

button {
  cursor: pointer;
  text-decoration: none;
  padding: 5px;
  transition-duration: 0.3s;
}
.mainContainer {
  display: flex;
}
.mainBody {
  flex-grow: 2;
}
</style>
