<template>
  <div class="modalContent">
    <div class="modalHeader">
      <h2>{{$t('login.forgetPassword')}}</h2>
      <button @click="$emit('close')">
        <CrossSVGIcon />
      </button>
    </div>
    <form @submit.prevent="resetPassword()">
      <InputEmail @emitEmail="handleEmitEmail" />
      <p class="forgotPasswordText">{{$t('login.forgetPasswordMsg')}}</p>
      <p v-if="error" class="emailCheckFail errorMessage">{{error}}</p>
      <input
        class="marginTopSubmit"
        type="submit"
        :value="$t('login.forgetPasswordBtn')"
        :disabled="!emailValidation"
      />
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import InputEmail from "./InputEmail";
import CrossSVGIcon from "./SVG/CrossSVGIcon";

export default {
  name: "ForgetPassword",
  components: {
    InputEmail,
    CrossSVGIcon
  },
  data() {
    return {
      email: "",
      emailValidation: false,
      error: ""
    };
  },
  computed: {
    submitChecker() {
      return this.emailValidation;
    }
  },
  methods: {
    resetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.error = "email sent";
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    handleEmitEmail(payload) {
      this.email = payload.email;
      this.emailValidation = payload.emailValidation;
    }
  }
};
</script>

<style scoped>
.forgotPasswordText {
  white-space: pre-wrap;
  cursor: default;
  text-align: center;
  font-size: 12px;
  margin-top: 15px;
}
.marginTopSubmit {
  margin-top: 20px;
}
</style>