<template>
  <div class="modalContent">
    <div>Todo</div>
    <!-- Fix date width -->
    <div class="yesNoBtnContainer">
      <div class="yesNoBtn no">No</div>
      <div class="yesNoBtn yes">Yes</div>
    </div>
  </div>
</template>
    
    
<script>
export default {
  name: "YesNoModal"
};
</script>

<style scoped>
.yesNoBtnContainer {
  display: flex;
}
.yesNoBtn {
  flex-grow: 1;
  cursor: pointer;
}
</style>