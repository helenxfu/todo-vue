<template>
  <div class="modalContent">
    <BaseModal @close="toggleModal" :class="{hideMe : hidden}">
      <ForgetPassword @close="toggleModal" />
    </BaseModal>
    <div class="modalHeader">
      <h2 v-if="register">{{$t('login.register')}}</h2>
      <h2 v-else>{{$t('login.login')}}</h2>
      <button @click="$emit('close')">
        <CrossSVGIcon />
      </button>
    </div>
    <form @submit.prevent="submitUserInfo()">
      <InputEmail @emitEmail="handleEmitEmail" />
      <InputPassword @emitPassword="handleEmitPassword" />
      <div class="validationContainer">
        <CircleCheckSVGIcon
          class="CircleCheckSVG iconBlock iconMarginRight"
          :check="passwordLengthValidation"
        />
        <p
          :class="passwordLengthValidation ? 'validColor' : 'invalidColor'"
        >{{$t('login.passwordLengthLimit')}}</p>
      </div>
      <div class="validationContainer spacingBottom">
        <CircleCheckSVGIcon
          class="CircleCheckSVG iconBlock iconMarginRight"
          :check="passwordTextValidation"
        />
        <p
          :class="passwordTextValidation ? 'validColor' : 'invalidColor'"
        >{{$t('login.passwordTextType')}}</p>
      </div>
      <p v-if="error" class="emailCheckFail errorMessage">{{error}}</p>
      <p v-if="!register" class="toggleLogin" @click="toggleModal">{{$t('login.forgetPassword')}}</p>
      <input
        type="submit"
        name="submitLoginRegister"
        :value="register ? $t('login.register') : $t('login.login')"
        :disabled="!submitChecker"
      />
      <p v-if="register" class="agreement">{{$t('login.agree')}}</p>
      <p
        class="toggleLogin"
        @click="toggleLogin"
      >{{register ? $t('login.haveAccount') : $t('login.noAccount')}}</p>
    </form>
    <h3 class="signInWith">{{$t('login.signInWith')}}</h3>
    <div class="socialLoginContainer">
      <button @click="signInTwitter">
        <img
          src="https://helenxfu.github.io/assets/socialLinks/twitter-white.png"
          class="loginSocialIcon"
          alt
        />
      </button>
      <button @click="signInFacebook">
        <img
          src="https://helenxfu.github.io/assets/socialLinks/facebook.png"
          class="loginSocialIcon"
          alt
        />
      </button>
      <button @click="signInGithub">
        <img
          src="https://helenxfu.github.io/assets/socialLinks/github.png"
          class="loginSocialIcon"
          alt
        />
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import BaseModal from "./BaseModal";
import ForgetPassword from "./ForgetPassword";
import InputEmail from "./InputEmail";
import InputPassword from "./InputPassword";

import CrossSVGIcon from "./SVG/CrossSVGIcon";
import CircleCheckSVGIcon from "./SVG/CircleCheckSVGIcon";

export default {
  name: "LoginSignUp",
  components: {
    BaseModal,
    ForgetPassword,
    InputEmail,
    InputPassword,
    CrossSVGIcon,
    CircleCheckSVGIcon
  },
  props: {
    registerProp: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hidden: true,
      register: false,
      email: "",
      emailValidation: false,
      password: "",
      passwordTextValidation: false,
      passwordLengthValidation: false,
      error: ""
    };
  },
  watch: {
    registerProp() {
      this.register = this.registerProp;
    }
  },
  computed: {
    submitChecker() {
      return (
        this.passwordTextValidation &&
        this.emailValidation &&
        this.passwordLengthValidation
      );
    }
  },
  methods: {
    toggleModal() {
      this.hidden = !this.hidden;
    },
    toggleLogin() {
      this.register = !this.register;
    },
    handleEmitEmail(payload) {
      this.email = payload.email;
      this.emailValidation = payload.emailValidation;
    },
    handleEmitPassword(payload) {
      this.password = payload.password;
      this.passwordTextValidation = payload.passwordTextValidation;
      this.passwordLengthValidation = payload.passwordLengthValidation;
    },
    submitUserInfo() {
      if (this.register) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email.trim(), this.password)
          .then(cred => {
            const userData = {
              email: cred.user.email,
              username: cred.user.email,
              lang: this.$store.state.user.lang,
              theme: this.$store.state.user.theme
            };
            firebase
              .firestore()
              .collection("users")
              .doc(cred.user.uid)
              .set(userData);
            this.$store.commit("setUserData", userData);
          })
          .then(() => {
            this.email = "";
            this.password = "";
            this.$emit("close");
          })
          .catch(error => {
            this.error = error.message;
          });
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email.trim(), this.password)
          .then(() => {
            this.email = "";
            this.password = "";
            this.$emit("close");
          })
          .catch(error => {
            this.error = error.message;
          });
      }
    },
    signInTwitter() {
      var provider = new firebase.auth.TwitterAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(cred => {
          const userRef = firebase
            .firestore()
            .collection("users")
            .doc(cred.user.uid);
          userRef.get().then(snapshot => {
            if (!snapshot.exists) {
              const userData = {
                email: "twitter",
                username: cred.user.displayName,
                lang: this.$store.state.user.lang,
                theme: this.$store.state.user.theme
              };
              userRef.set(userData);
              this.$store.commit("setUserData", userData);
            }
          });
        })
        .then(() => {
          this.email = "";
          this.password = "";
          this.$emit("close");
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    signInGithub() {
      var provider = new firebase.auth.GithubAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(cred => {
          const userRef = firebase
            .firestore()
            .collection("users")
            .doc(cred.user.uid);
          userRef.get().then(snapshot => {
            if (!snapshot.exists) {
              const userData = {
                email: "github",
                username: cred.user.displayName,
                lang: this.$store.state.user.lang,
                theme: this.$store.state.user.theme
              };
              userRef.set(userData);
            }
          });
        })
        .then(() => {
          this.email = "";
          this.password = "";
          this.$emit("close");
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    signInFacebook() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(cred => {
          const userRef = firebase
            .firestore()
            .collection("users")
            .doc(cred.user.uid);
          userRef.get().then(snapshot => {
            if (!snapshot.exists) {
              const userData = {
                email: "facebook",
                username: cred.user.displayName,
                lang: this.$store.state.user.lang,
                theme: this.$store.state.user.theme
              };
              userRef.set(userData);
            }
          });
        })
        .then(() => {
          this.email = "";
          this.password = "";
          this.$emit("close");
        })
        .catch(error => {
          this.error = error.message;
        });
    }
  }
};
</script>

<style scoped>
.socialLoginContainer {
  display: flex;
  justify-content: center;
}
.loginSocialIcon {
  width: 40px;
  padding: 5px;
}
.spacingBottom {
  margin-bottom: 30px;
}
</style>