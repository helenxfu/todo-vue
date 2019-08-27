<template>
  <div class="empty">
    <div class="emptySvg">
      <EmptySVGIcon />
    </div>
    <div class="emptyText">{{$t('text.none')}}</div>
  </div>
</template>

<script>
import EmptySVGIcon from "./SVG/EmptySVGIcon";

export default {
  name: "EmptyTask",
  components: {
    EmptySVGIcon
  }
};
</script>
