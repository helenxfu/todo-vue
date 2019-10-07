<template>
  <div class="modalMask" @click="$emit('close')">
    <div class="modal" ref="modal" style="top: calc(50% - 267px)" @click.stop>
      <div class="modalHeader">
        <h2 v-if="register">{{$t('login.register')}}</h2>
        <h2 v-else>{{$t('login.login')}}</h2>
        <button @click="$emit('close')">
          <CrossSVGIcon />
        </button>
      </div>
      <form @submit.prevent="submitUserInfo()">
        <div>
          <label>
            {{$t('login.email')}}
            <span
              v-if="emailCheckWarn"
              class="emailCheckFail"
            >{{$t('login.invalidEmail')}}</span>
          </label>
          <br />
          <div class="loginInputContainer">
            <MailSVGIcon class="iconBlock iconMarginLeft" />
            <input
              type="email"
              name="email"
              autocomplete="off"
              v-model="email"
              :placeholder="$t('login.emailInput')"
              @keyup="submitChecker()"
              required
            />
          </div>
        </div>
        <div>
          <label>{{$t('login.password')}}</label>
          <br />
          <div class="loginInputContainer">
            <LockSVGIcon class="iconBlock iconMarginLeft" />
            <input
              :type="toggle"
              name="password"
              autocomplete="off"
              v-model="password"
              :placeholder="$t('login.passwordInput')"
              @keyup="submitChecker()"
              required
            />
            <div @click="clearInput">
              <CircleXSVGIcon class="iconBlock iconMarginRight" />
            </div>
            <div @click="togglePasswordDisplay">
              <EyeXSVGIcon class="iconBlock iconMarginRight" v-if="toggle === 'password'" />
              <EyeSVGIcon class="iconBlock iconMarginRight" v-if="toggle === 'text'" />
            </div>
          </div>
        </div>
        <div class="validationContainer">
          <CircleCheckSVGIcon
            class="CircleCheckSVG iconBlock iconMarginRight"
            :check="passwordLength()"
          />
          <p
            :class="passwordLength() ? 'validColor' : 'invalidColor'"
          >{{$t('login.passwordLengthLimit')}}</p>
        </div>
        <div class="validationContainer spacingBottom">
          <CircleCheckSVGIcon
            class="CircleCheckSVG iconBlock iconMarginRight"
            :check="validatePassword()"
          />
          <p
            :class="validatePassword() ? 'validColor' : 'invalidColor'"
          >{{$t('login.passwordTextType')}}</p>
        </div>
        <p v-if="error" class="emailCheckFail errorMessage">{{error}}</p>
        <!-- TODO: in the future -->
        <!-- <p v-if="!register" class="toggleLogin">{{$t('login.forgetPassword')}}</p> -->
        <input
          type="submit"
          name="submitLoginRegister"
          :value="register ? $t('login.register') : $t('login.login')"
          :disabled="disabled"
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
        <button @click="signInGithub">
          <img
            src="https://helenxfu.github.io/assets/socialLinks/github.png"
            class="loginSocialIcon"
            alt
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import CrossSVGIcon from "./SVG/CrossSVGIcon";
import CircleCheckSVGIcon from "./SVG/CircleCheckSVGIcon";
import CircleXSVGIcon from "./SVG/CircleXSVGIcon";
import EyeSVGIcon from "./SVG/EyeSVGIcon";
import EyeXSVGIcon from "./SVG/EyeXSVGIcon";
import LockSVGIcon from "./SVG/LockSVGIcon";
import MailSVGIcon from "./SVG/MailSVGIcon";

export default {
  name: "LoginSignUp",
  components: {
    CrossSVGIcon,
    CircleCheckSVGIcon,
    CircleXSVGIcon,
    EyeSVGIcon,
    EyeXSVGIcon,
    LockSVGIcon,
    MailSVGIcon
  },
  props: {
    registerProp: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      register: false,
      email: "",
      password: "",
      emailCheckWarn: false,
      toggle: "password",
      disabled: true,
      error: ""
    };
  },
  watch: {
    registerProp() {
      this.register = this.registerProp;
    }
  },
  methods: {
    clearInput() {
      this.password = "";
    },
    toggleLogin() {
      this.register = !this.register;
    },
    togglePasswordDisplay() {
      if (this.toggle === "password") {
        this.toggle = "text";
      } else {
        this.toggle = "password";
      }
    },
    validatePassword() {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/;
      const text = this.password;
      return regex.test(text);
    },
    passwordLength() {
      return this.password.length >= 6 && this.password.length <= 25;
    },
    validateEmail() {
      // RFC 2822 email validation
      // eslint-disable-next-line no-control-regex
      const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      const text = this.email.trim();
      const result = regex.test(text);
      // disallow spacing, foreign text, full-width alphabet
      const regex2 = /^[\w@.!#$%&’'"<>*+/=?^`{|}~-]{2,}$/;
      const result2 = regex2.test(text);
      this.emailCheckWarn = !result || !result2;
      return result && result2;
    },
    submitChecker() {
      this.validateEmail() && this.passwordLength() && this.validatePassword()
        ? (this.disabled = false)
        : (this.disabled = true);
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