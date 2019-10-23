<template>
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
        @input="passwordInput"
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
</template>

<script>
import CircleXSVGIcon from "./SVG/CircleXSVGIcon";
import EyeSVGIcon from "./SVG/EyeSVGIcon";
import EyeXSVGIcon from "./SVG/EyeXSVGIcon";
import LockSVGIcon from "./SVG/LockSVGIcon";

export default {
  name: "InputPassword",
  components: {
    CircleXSVGIcon,
    EyeSVGIcon,
    EyeXSVGIcon,
    LockSVGIcon
  },
  data() {
    return {
      password: "",
      toggle: "password"
    };
  },
  methods: {
    clearInput() {
      this.password = "";
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
    passwordInput() {
      const passwordTextValidation = this.validatePassword();
      const passwordLengthValidation =
        this.password.length >= 6 && this.password.length <= 25;
      this.$emit("emitPassword", {
        password: this.password,
        passwordTextValidation,
        passwordLengthValidation
      });
    }
  }
};
</script>