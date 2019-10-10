<template>
  <div class="modalMask" @click="$emit('close')">
    <div class="modalContainer">
      <div @click.stop>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModal"
};
</script>