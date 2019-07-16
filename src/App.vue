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
