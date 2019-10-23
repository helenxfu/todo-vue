<template>
  <div class="modalContent">
    <div class="modalHeader">
      <h2>Test header</h2>
      <button @click="$emit('close')">
        <CrossSVGIcon />
      </button>
    </div>
    <div>test body</div>
  </div>
</template>

<script>
import CrossSVGIcon from "./SVG/CrossSVGIcon";

export default {
  name: "Test",
  components: { CrossSVGIcon }
};
</script>