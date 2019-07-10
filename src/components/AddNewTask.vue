<template>
  <div>
    <form @submit.prevent="handleAddTodo()">
      <input type="text" name="title" v-model="title" placeholder="Add new task here...." required />
      <label>
        <input v-model="priority" type="radio" name="priority" value="0" />low
      </label>
      <label>
        <input v-model="priority" type="radio" name="priority" value="1" />mid
      </label>
      <label>
        <input v-model="priority" type="radio" name="priority" value="2" />high
      </label>
      <input type="text" v-model="category" name="category" placeholder="category name" />
      <input v-model="limit" type="date" name="limit" required />
      <input type="submit" name="submit" />
      <input type="reset" name="reset" />
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddNewTask",
  data() {
    return {
      title: "",
      priority: 0,
      category: "",
      limit: ""
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    handleAddTodo() {
      const newTodo = {
        id: this.title + Math.floor(Math.random() * 100),
        title: this.title,
        priority: this.priority,
        category: this.category,
        limit: this.limit,
        completed: false
      };
      this.addTodo(newTodo);
      this.title = "";
    }
  }
};
</script>

<style scoped>
input {
  border: 1px solid pink;
}
</style>