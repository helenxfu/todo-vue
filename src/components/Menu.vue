<template>
  <div class="menu">
    <div class="logo">
      <h1>Candy Jar</h1>
      <h2>Task Tracker</h2>
    </div>
    <div class="statusContainer">
      <div></div>
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
      <div></div>
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