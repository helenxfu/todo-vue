<template>
  <div class="mainContainer">
    <Menu />
    <AppBody :todos="todos" class="mainBody" />
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import AppBody from "./components/AppBody.vue";
import { mapState } from "vuex";

export default {
  name: "app",
  components: {
    Menu,
    AppBody
  },
  computed: mapState(["todos"]),
  created() {
    this.$store.dispatch("todayRendered");
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
  font-size: 16px;
  color: rgb(34, 34, 34);
}
img {
  width: 100%;
}
input,
button {
  border: none;
  outline: none;
  text-decoration: none;
}
.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently supported by Chrome and Opera */
}

button {
  cursor: pointer;
  text-decoration: none;
  padding: 5px;
  transition-duration: 0.3s;
}
button {
  cursor: pointer;
  transition-property: filter;
  transition-duration: 1s;
}
button:hover {
  filter: hue-rotate(270deg);
}
button:active {
  transform: translateY(1px);
  box-shadow: none;
}
button:disabled {
  cursor: default;
  color: rgb(202, 202, 202);
}
.mainContainer {
  display: flex;
}
.mainBody {
  flex-grow: 2;
}
</style>
