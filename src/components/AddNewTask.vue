<template>
  <div>
    <form @submit.prevent="addTodo">
      <input type="text" name="title" :value="title" placeholder="Add new task here...." required>
      <label>
        <input v-model="priority" type="radio" name="priority" value="0">low
      </label>
      <label>
        <input v-model="priority" type="radio" name="priority" value="1">mid
      </label>
      <label>
        <input v-model="priority" type="radio" name="priority" value="2">high
      </label>
      <input type="text" :value="category" name="category" placeholder="category name">
      <input v-model="limit" type="date" name="limit" required>
      <input type="submit" name="submit">
      <input type="reset" name="reset">
    </form>
  </div>
</template>

<script>
export default {
  name: "AddNewTask",
  props: {
    newId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      title: "",
      priority: 0,
      category: "",
      limit: ""
    };
  },
  methods: {
    addTodo() {
      const newTodo = {
        id: this.newId,
        title: this.title,
        priority: this.priority,
        category: this.category,
        limit: this.limit,
        completed: false
      };
      this.$emit("add-todo", newTodo);
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