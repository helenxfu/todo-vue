<template>
  <div class="headerContainer">
    <h1>Task Tracker</h1>
    <div class="btnContainer">
      <button>English</button>
      <button class="borderLeft">日本語</button>
      <button class="borderLeft">中文</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
.headerContainer {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 30px;
  border-bottom: 2px solid rgb(69, 43, 77);
}
h1 {
  font-size: 25px;
}
.btnContainer {
  margin: 3px;
}
.borderLeft {
  border-left: 1px solid black;
}
button {
  background-color: rgba(255, 255, 255, 0);
}
button:hover {
  color: rgb(151, 54, 161);
}
</style>