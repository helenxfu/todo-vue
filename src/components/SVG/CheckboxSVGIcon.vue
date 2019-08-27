<template>
  <svg
    class="checkIcon"
    :class="[completed ? 'check' : 'uncheck']"
    x="0px"
    y="0px"
    viewBox="0 0 15 15"
  >
    <rect width="15" height="15" />
    <polyline v-if="completed" points="2.4,8.3 5.7,11.9 12.3,3.5 " />
  </svg>
</template>

<script>
export default {
  name: "CheckboxSVGIcon",
  props: {
    completed: {
      default: false,
      type: Boolean
    }
  }
};
</script>