<template>
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
        @input="validateEmail"
        required
      />
    </div>
  </div>
</template>

<script>
import MailSVGIcon from "./SVG/MailSVGIcon";

export default {
  name: "InputEmail",
  components: {
    MailSVGIcon
  },
  data() {
    return {
      email: "",
      emailCheckWarn: ""
    };
  },
  methods: {
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
      const validation = result && result2;

      this.$emit("emitEmail", {
        email: this.email,
        emailValidation: validation
      });
    }
  }
};
</script>