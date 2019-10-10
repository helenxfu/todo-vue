<template>
  <div class="appContainer" :class="theme">
    <Menu />
    <AppBody class="mainBody" />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import Menu from "./components/Menu.vue";
import AppBody from "./components/AppBody.vue";

import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    Menu,
    AppBody
  },
  computed: {
    ...mapGetters(["theme"])
  },
  async created() {
    this.$store.dispatch("todayRendered");

    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("setUid", user.uid);
        const userRef = firebase
          .firestore()
          .collection("users")
          .doc(user.uid);
        userRef.get().then(doc => {
          if (doc.exists) {
            const userData = {
              email: doc.data().email,
              username: doc.data().username,
              lang: doc.data().lang,
              theme: doc.data().theme
            };
            this.$store.commit("setUserData", userData);
          }
        });
        const userTodos = [];

        userRef
          .collection("todos")
          .get()
          .then(todo => {
            todo.docs.forEach(doc => {
              const data = {
                id: doc.id,
                title: doc.data().title,
                priority: doc.data().priority,
                category: doc.data().category,
                limit: doc.data().limit,
                completed: doc.data().completed
              };
              userTodos.push(data);
            });
          });
        this.$store.commit("setUserTodos", userTodos);
        // eslint-disable-next-line no-console
        console.log("logged in APP");
      } else {
        this.$store.dispatch("insertMock");
        this.$store.dispatch("clearUserData");
        // eslint-disable-next-line no-console
        console.log("logged out APP");
      }
    });
  }
};
</script>
