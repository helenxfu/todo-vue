<template>
  <div class="headerContainer">
    <h1>Task Tracker</h1>
    <div class="btnContainer">
      <button @click="switchLang('en')">English</button>
      <button class="borderLeft" @click="switchLang('ja')">日本語</button>
      <button class="borderLeft" @click="switchLang('zh')">中文</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    switchLang(lang) {
      this.$i18n.locale = lang;
    }
  }
};
</script>
