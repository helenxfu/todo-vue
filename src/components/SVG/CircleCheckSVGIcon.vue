<template>
  <svg viewBox="0 0 19.21 19.21">
    <title>circleCheck</title>
    <circle class="circle1" :class="check ? 'iconColorStroke' :'iconColorUnstroke'" cx="9.6" cy="9.6" r="8.7" />
    <polyline
      class="circle2"
      :class="check ? 'iconColorStroke' :'iconColorUnstroke'"
      points="4.74 10.63 7.08 13.83 14.47 6.1"
    />
  </svg>
</template>

<script>
export default {
  name: "CircleCheckSVGIcon",
  props: {
    check: {
      default: false,
      type: Boolean
    }
  }
};
</script>