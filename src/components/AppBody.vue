<template>
  <div class="bodyContainer">
    <Header @login="toggleModal" @register="toggleModal(true)" />
    <AddNewTask />
    <div class="tableLegend">
      <Legend />
      <TextFilter />
    </div>
    <MockDataWarn v-if="!isLoggedIn" @openRegister="toggleModal(true)" />
    <EmptyTask v-if="todoLength === 0" />
    <div v-else class="tableContainer">
      <TaskTable />
    </div>
    <BaseModal @close="toggleModal" :class="{hideMe : hidden}">
      <LoginSignUp :registerProp="register" @close="toggleModal" />
    </BaseModal>
  </div>
</template>

<script>
import Header from "./Header";
import AddNewTask from "./AddNewTask";
import EmptyTask from "./EmptyTask";
import TaskTable from "./TaskTable";
import Legend from "./Legend";
import TextFilter from "./TextFilter";
import MockDataWarn from "./MockDataWarn";
import BaseModal from "./BaseModal";
import LoginSignUp from "./LoginSignUp";
import { mapGetters } from "vuex";

export default {
  name: "AppBody",
  components: {
    Header,
    AddNewTask,
    EmptyTask,
    TaskTable,
    Legend,
    TextFilter,
    MockDataWarn,
    BaseModal,
    LoginSignUp
  },
  data() {
    return {
      hidden: true,
      register: false
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "todoLength"])
  },
  methods: {
    toggleModal(register = false) {
      this.register = register;
      this.hidden = !this.hidden;
    }
  }
};
</script>
