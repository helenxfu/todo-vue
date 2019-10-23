<template>
  <div class="modalContent">
    <div class="modalHeader">
      <h2>{{$t('userSetting.userSetting')}}</h2>
      <button @click="$emit('close')">
        <CrossSVGIcon />
      </button>
    </div>
    <div>
      <h3 class="settingLabel">{{$t('userSetting.username')}}</h3>
      <div class="settingSection">
        <p class="textWrap">example@example.com</p>
        <button @click="toggleModal">
          <PencilSVGIcon />
        </button>
      </div>
      <h3 class="settingLabel">{{$t('login.email')}}</h3>
      <div class="settingSection">
        <p class="textWrap">example@example.comexample@example.com</p>
        <button @click="toggleModal">
          <PencilSVGIcon />
        </button>
      </div>
      <h3 class="settingLabel">{{$t('login.password')}}</h3>
      <div class="settingSection">
        <p class="textWrap">******</p>
        <button @click="toggleModal">
          <PencilSVGIcon />
        </button>
      </div>
    </div>
    <div>
      <p class="deleteInfo" @click="deleteUser">{{$t('userSetting.deleteTodo')}}</p>
      <p class="deleteInfo" @click="deleteUser">{{$t('userSetting.deleteAccount')}}</p>
    </div>
    <BaseModal @close="toggleModal" :class="{hideMe : hidden}">
      <Test @close="toggleModal" />
    </BaseModal>
  </div>
</template>

<script>
import BaseModal from "./BaseModal";
import Test from "./Test";
import CrossSVGIcon from "./SVG/CrossSVGIcon";
import PencilSVGIcon from "./SVG/PencilSVGIcon";

export default {
  name: "UserSetting",
  components: {
    BaseModal,
    Test,
    CrossSVGIcon,
    PencilSVGIcon
  },
  data() {
    return {
      hidden: true
    };
  },
  methods: {
    toggleModal() {
      this.hidden = !this.hidden;
    },
    deleteUser() {
      console.log("action");
      // firebase
      //   .auth()
      //   .currentUser.delete()
      //   .then(()=> {
      //     // User deleted.
      //   })
      //   .catch(error=> {
      //     // An error happened.
      //   });
    }
  }
};
</script>

<style scoped>
.modalHeader {
  margin-bottom: 20px;
}
.settingLabel {
  font-size: 12px;
}
.settingSection {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.deleteInfo {
  font-size: 12px;
  margin-bottom: 10px;
  cursor: pointer;
}
.textWrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>