<template>
  <div class="legend">
    <div class="legendColumn">
      <div class="legendKey">
        <div class="box circle priorityLow"></div>
        <p>{{$t('table.priorityLow')}}</p>
      </div>
      <div class="legendKey">
        <div class="box circle priorityMid"></div>
        <p>{{$t('table.priorityMid')}}</p>
      </div>
      <div class="legendKey">
        <div class="box circle priorityHigh"></div>
        <p>{{$t('table.priorityHigh')}}</p>
      </div>
    </div>
    <div class="legendColumn">
      <div class="legendKey">
        <div class="box completed"></div>
        <p>{{$t('text.completed')}}</p>
      </div>
      <div class="legendKey">
        <div class="box passed"></div>
        <p>{{$t("text.passed")}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Legend"
};
</script>