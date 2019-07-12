<template>
  <div class="menu">
    <h1>Fruit Bowl</h1>
    <h2>Task Tracker</h2>
    <div class="status">
      <h3>
        {{$t('status.tableCount')}}
        <span>{{todoLength}}</span>
      </h3>
      <h3>
        {{$t('status.tableRemain')}}
        <span>{{todoLength - todoCompleted}}</span>
      </h3>
      <h3>
        {{$t('status.tableOverdue')}}
        <span :class="{warning : overdue > 0}">{{overdue}}</span>
      </h3>
      <h3>
        {{$t('status.tableComp')}}
        <span>{{todoCompleted}}</span>
      </h3>
      <h3>
        {{$t('status.tableRate')}}
        <span :class="{compMsg : todoLength === 0}">{{completionRate}}</span>
      </h3>
    </div>
    <h4>{{$t('menu.titleTasks')}}</h4>
    <button @click="deleteCompleted()" :disabled="todoCompleted === 0">{{$t('menu.delComp')}}</button>
    <button @click="deleteAll()" :disabled="todoLength === 0">{{$t('menu.deleteAll')}}</button>
    <div>
      <h4>{{$t('menu.titleTheme')}}</h4>
      <button>{{$t('menu.modeClassic')}}</button>
      <button>{{$t('menu.modeDark')}}</button>
      <button>{{$t('menu.modeLight')}}</button>
      <button>{{$t('menu.modeVibrant')}}</button>
      <button>{{$t('menu.modeMonotone')}}</button>
    </div>

    <div class="links">
      <p>links here</p>
    </div>
    <p class="credit">&#169; Starcloud</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Menu",
  computed: {
    ...mapGetters(["todoLength", "todoCompleted", "completionRate", "overdue"])
  },
  methods: {
    ...mapActions(["deleteAll", "deleteCompleted"])
  }
};
</script>

<style scoped>
.menu {
  width: 200px;
  background-color: rgb(248, 241, 253);
  text-align: center;
  padding: 20px;
  min-height: 100vh;
}
button {
  display: block;
  margin: 5px auto;
  border-radius: 7px;
  background-color: rgb(248, 241, 253);
  border: 1px solid rgb(224, 200, 224);
}
button:hover {
  background-color: rgb(228, 212, 240);
}
h1 {
  font-size: 25px;
}
h2 {
  font-size: 20px;
}
.status {
  margin: 5px;
}
h3 {
  font-size: 18px;
  position: relative;
  margin: 20px;
}
span {
  position: absolute;
  bottom: -5px;
  right: 0;
  font-size: 40px;
  color: rgba(153, 50, 204, 0.6);
}
.compMsg {
  font-size: 20px;
}
.warning {
  color: rgba(255, 0, 0, 0.4);
}
h4 {
  margin-top: 20px;
  font-size: 16px;
}
.links {
  margin-top: 10px;
}
.credit {
  margin-top: 10px;
}
</style>