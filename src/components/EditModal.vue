<template>
  <div>
    <div>
      <p>Edit Task</p>
      <button @click="$emit('close')">X</button>
    </div>
    <div>{{todo.title}}</div>
  </div>
</template>

<script>
export default {
  name: "EditModal",
  props: {
    todo: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style scoped>
</style>