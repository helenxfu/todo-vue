<template>
  <div>
    <div>
      <p>Edit Task</p>
      <button @click="$emit('close')">X</button>
    </div>
    <div>{{index}}</div>
  </div>
</template>

<script>
export default {
  name: "EditModal",
  props: {
    index: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped>
</style>