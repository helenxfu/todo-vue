<template>
  <div class="menu">
    <div class="logoContainer">
      <div class="logo">
        <BottleSVGIcon />
      </div>
      <h1>Candy Jar</h1>
      <h2>Task Tracker</h2>
    </div>
    <div class="statusContainer">
      <div></div>
      <div class="status">
        <h3>{{$t('status.tableCount')}}</h3>
        <p>{{todoLength}}</p>
        <h3>{{$t('status.tableRemain')}}</h3>
        <p>{{todoLength - todoCompleted}}</p>
        <h3>{{$t('status.tableOverdue')}}</h3>
        <p :class="{warning : overdue > 0}">{{overdue}}</p>
        <h3>{{$t('status.tableComp')}}</h3>
        <p>{{todoCompleted}}</p>
        <h3>{{$t('status.tableRate')}}</h3>
        <p>{{completionRate}}</p>
      </div>
      <div></div>
    </div>
    <h4>{{$t('menu.titleTasks')}}</h4>
    <button @click="deleteCompleted" :disabled="todoCompleted === 0">{{$t('menu.delComp')}}</button>
    <!-- @click="toggleModal" -->
    <button @click="deleteAll" :disabled="todoLength === 0">{{$t('menu.deleteAll')}}</button>
    <div>
      <h4>{{$t('menu.titleTheme')}}</h4>
      <button @click="setTheme('classic')">{{$t('menu.modeClassic')}}</button>
      <button @click="setTheme('dark')">{{$t('menu.modeDark')}}</button>
      <button @click="setTheme('pastel')">{{$t('menu.modePastel')}}</button>
    </div>

    <div class="linksContainer">
      <div class="socialLinks">
        <a href="https://facebook.com/helenxfu/">
          <img src="https://helenxfu.github.io/assets/socialLinks/facebook.png" alt />
        </a>
        <a href="https://twitter.com/HelenStarcloud/">
          <img src="https://helenxfu.github.io/assets/socialLinks/twitter-white.png" alt />
        </a>
        <a href="https://www.linkedin.com/in/helenxfu/">
          <img src="https://helenxfu.github.io/assets/socialLinks/linkedIn.png" alt />
        </a>
        <a href="https://github.com/helenxfu/">
          <img src="https://helenxfu.github.io/assets/socialLinks/github.png" alt />
        </a>
        <a href="https://helenxfu.github.io/">
          <img src="https://helenxfu.github.io/assets/socialLinks/clearstarcloud.png" alt />
        </a>
      </div>
    </div>
    <p class="credit">&#169; Starcloud</p>
    <BaseModal @close="toggleModal" :class="{hideMe : hidden}">
      <YesNoModal @close="toggleModal" />
    </BaseModal>
  </div>
</template>

<script>
import BaseModal from "./BaseModal";
import YesNoModal from "./YesNoModal";

import BottleSVGIcon from "./SVG/BottleSVGIcon";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Menu",
  components: {
    BaseModal,
    YesNoModal,
    BottleSVGIcon
  },
  data() {
    return {
      hidden: true
    };
  },
  computed: {
    ...mapGetters(["todoLength", "todoCompleted", "completionRate", "overdue"])
  },
  methods: {
    ...mapActions(["deleteAll", "deleteCompleted", "setTheme"]),
    toggleModal() {
      this.hidden = !this.hidden;
    }
  }
};
</script>