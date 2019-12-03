<template>
  <div class="headerContainer">
    <div v-if="isLoggedIn" class="outerContainer">
      <input
        v-if="editUsername"
        type="text"
        v-model="username"
        :placeholder="$t('login.setUsername')"
        class="usernameInput"
        @blur="blurUsernameInput"
      />
      <h1 class="usernameContainer" @click="toggleEditUsername" v-else>
        <PencilSVGIcon class="pencilIcon" />
        <span class="username">{{!!username ? username : $t('login.setUsername') }}</span>
      </h1>
    </div>
    <h1 v-else>Task Tracker</h1>
    <div class="btnContainer">
      <div class="registerButtons">
        <input
          class="marginLeft"
          type="button"
          name="register"
          :value="$t('login.register')"
          @click="$emit('register')"
          v-if="!isLoggedIn"
        />
        <input
          class="marginLeft"
          type="button"
          name="login"
          :value="$t('login.login')"
          @click="$emit('login')"
          v-if="!isLoggedIn"
        />
        <input
          class="marginLeft"
          type="button"
          name="userSetting"
          :value="$t('userSetting.settingBtn')"
          @click="toggleModal"
          v-if="isLoggedIn"
        />
        <input
          class="marginLeft"
          type="button"
          name="logout"
          :value="$t('login.logout')"
          @click="logout"
          v-if="isLoggedIn"
        />
      </div>
      <div>
        <button @click="switchLang('en')">English</button>
        <button class="borderLeft" @click="switchLang('ja')">日本語</button>
        <button class="borderLeft" @click="switchLang('zh')">中文</button>
      </div>
    </div>
    <BaseModal @close="toggleModal" :class="{hideMe : hidden}">
      <UserSetting @close="toggleModal" />
    </BaseModal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseModal from "./BaseModal";
import UserSetting from "./UserSetting";

import PencilSVGIcon from "./SVG/PencilSVGIcon";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  name: "Header",
  components: {
    BaseModal,
    UserSetting,
    PencilSVGIcon
  },
  data() {
    return {
      editUsername: false,
      username: "",
      hidden: true
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getUsername"])
  },
  methods: {
    switchLang(lang) {
      this.$store.dispatch("setLang", lang);
    },
    toggleEditUsername() {
      this.editUsername = !this.editUsername;
    },
    blurUsernameInput() {
      if (this.username !== this.getUsername) {
        this.$store.dispatch("changeUsername", this.username);
      }
      this.toggleEditUsername();
    },
    logout() {
      try {
        firebase.auth().signOut();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log("logout error", e);
      }
    },
    toggleModal() {
      this.hidden = !this.hidden;
    }
  },
  watch: {
    getUsername() {
      this.username = this.getUsername;
    }
  }
};
</script>

<style scoped>
.outerContainer {
  overflow: hidden;
  flex-grow: 1;
}
.usernameContainer {
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
}
.username {
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pencilIcon {
  margin-right: 2px;
}
.usernameInput {
  max-width: 300px;
}
</style>
