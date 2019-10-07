import Vuex from 'vuex';
import Vue from 'vue';
import i18n from '../i18n.js';

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    today: "", //renders today through todayRendered method on create App.vue to format today to the 0AM time and store the value here
    reverse: false,
    filterBy: {
      priority: false,
      category: false,
      title: false,
      limit: false,
    },
    search: "",
    user: {
      uid: "",
      username: "",
      lang: "en",
      theme: "classic",
    },
    todos: [],
    todosMock: [
      {
        id: "id0",
        title: 'Java intro',
        priority: 2,
        category: 'Java',
        limit: '2020-08-14',
        completed: false,
      },
      {
        id: "id1",
        title: 'Vue Todo',
        priority: 2,
        category: 'Vue',
        limit: '2019-08-14',
        completed: false,
      },
      {
        id: "id2",
        title: 'React course',
        priority: 1,
        category: 'React',
        limit: '2019-12-20',
        completed: false,
      },
      {
        id: "id3",
        title: 'React Calendar',
        priority: 1,
        category: 'React',
        limit: '2019-11-30',
        completed: false,
      },
      {
        id: "id4",
        title: 'CS50',
        priority: 0,
        category: 'YouTube',
        limit: '2020-09-12',
        completed: false,
      },
      {
        id: "id5",
        title: 'Illustrator crashcourse',
        priority: 0,
        category: 'Adobe',
        limit: '2020-08-22',
        completed: false,
      },
      {
        id: "id6",
        title: 'InDesign',
        priority: 0,
        category: 'Adobe',
        limit: '2021-09-02',
        completed: false,
      },
      {
        id: "id7",
        title: 'Java intro',
        priority: 2,
        category: 'AAA',
        limit: '2020-08-14',
        completed: false,
      },
      {
        id: "id8",
        title: 'AAA',
        priority: 0,
        category: 'AAA',
        limit: '2020-02-14',
        completed: false,
      },
      {
        id: "id9",
        title: 'AAB',
        priority: 2,
        category: 'AAA',
        limit: '2020-03-14',
        completed: false,
      },
      {
        id: "id10",
        title: 'BBB',
        priority: 2,
        category: 'AAA',
        limit: '2020-01-14',
        completed: false,
      },
      {
        id: "id11",
        title: 'AAB',
        priority: 1,
        category: 'BBB',
        limit: '2020-02-14',
        completed: false,
      },
    ],
  },
  getters: {
    renderTodos(state) {
      let list = state.search.length > 0 ? state.todos.filter(listItem => listItem.title.toLowerCase().match(state.search) || listItem.category.toLowerCase().match(state.search)) : state.todos
      return list;
    },
    theme(state) {
      return state.user.theme
    },
    isLoggedIn(state) {
      return !!state.user.uid
    },
    getUsername(state) {
      return state.user.username
    },
    todoLength: state => {
      return state.todos.length;
    },
    todoCompleted: state => {
      return state.todos.filter(x => x.completed).length;
    },
    completionRate: (state, getters) => {
      return getters.todoLength === 0
        ? i18n.t('status.noTasks')
        : Math.round((getters.todoCompleted / getters.todoLength) * 100) + '%';
    },
    dateToday() {
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      if (mm < 10) {
        mm = '0' + mm;
      }
      if (dd < 10) {
        dd = '0' + dd;
      }
      return yyyy + '-' + mm + '-' + dd
    },
    overdue(state) {
      let overdueCount = 0;
      const today = state.today;
      state.todos.forEach(todo => {
        const MS_IN_ONE_DAY = 1000 * 60 * 60 * 24;
        const countDown = (new Date(todo.limit) - today) / MS_IN_ONE_DAY;
        if (countDown < 0) overdueCount++;
      });
      return overdueCount;
    },
  },
  actions: {
    insertMock({ commit }) {
      commit('insertMock');
    },
    setUid({ commit }, payload) {
      commit('setUid', payload)
    },
    setUserData({ commit }, payload) {
      commit('setUserData', payload)
    },
    clearUserData({ commit }) {
      commit('clearUserData');
    },
    changeUsername({ commit, state }, payload) {
      firebase.firestore().collection("users").doc(state.user.uid).update({
        username: payload
      }).catch(() => {
        firebase.firestore().collection("users").doc(state.user.uid).set({
          username: payload
        })
      })
      commit('changeUsername', payload)
    },
    todayRendered({ commit, getters }) {
      //resets Date value to 0:00AM
      const payload = new Date(getters.dateToday);
      commit('todayRendered', payload);
    },
    deleteAll({ commit, state }) {
      const confirmed = confirm(i18n.t('text.confirm'));
      if (confirmed) {
        if (state.user.uid !== "") {
          state.todos.forEach(task => {
            firebase
              .firestore()
              .collection("users")
              .doc(state.user.uid)
              .collection("todos")
              .doc(String(task.id)).delete()
          })
        }
        commit('deleteAll');
      }
    },
    deleteCompleted({ commit, state }) {
      if (state.user.uid !== "") {
        let compTasks = state.todos.filter(x => x.completed);
        compTasks.forEach(compTask => {
          firebase
            .firestore()
            .collection("users")
            .doc(state.user.uid)
            .collection("todos")
            .doc(String(compTask.id)).delete()
        })
      }
      commit('deleteCompleted');
    },
    deleteTodo({ commit, state }, id) {
      if (state.user.uid !== "") {
        firebase
          .firestore()
          .collection("users")
          .doc(state.user.uid)
          .collection("todos")
          .doc(String(id)).delete()
      }
      commit('deleteTodo', id);
    },
    addTodo({ commit, state }, payload) {
      if (state.user.uid !== "") {
        const docId = String(payload.id)
        firebase
          .firestore()
          .collection("users")
          .doc(state.user.uid)
          .collection("todos")
          .doc(docId).set({
            title: payload.title,
            priority: Number(payload.priority),
            category: payload.category,
            limit: payload.limit,
            completed: payload.completed
          })
      }
      commit('addTodo', payload);
      const regex = new RegExp(state.search);
      if (state.search !== "" && !regex.test(payload.title.toLowerCase()) && !regex.test(payload.category.toLowerCase())) {
        commit('searchText', '');
      }
    },
    editTodo({ commit, state }, payload) {
      if (state.user.uid !== "") {
        firebase
          .firestore()
          .collection("users")
          .doc(state.user.uid)
          .collection("todos")
          .doc(String(payload.id)).update({
            title: payload.title,
            priority: Number(payload.priority),
            category: payload.category,
            limit: payload.limit,
            completed: payload.completed
          })
      }
      commit('editTodo', payload);
      const regex = new RegExp(state.search);
      if (!regex.test(state.search !== "" && payload.title.toLowerCase()) && !regex.test(payload.category.toLowerCase())) {
        commit('searchText', '');
      }
    },
    toggleComplete({ commit, state }, payload) {
      if (state.user.uid !== "") {
        firebase
          .firestore()
          .collection("users")
          .doc(state.user.uid)
          .collection("todos")
          .doc(String(payload.id)).update({
            completed: !payload.completed
          })
      }
      commit('toggleComplete', payload);
    },
    filterFunction({ commit, state }, payload) {
      // if the user clicks the same filter a second time, it would change the reverse state only.
      // if user clicks a different filter, it would resetFilter and reset reverse state
      // finally run filterFunction to filter tasks. 
      if (state.filterBy[payload] === true) {
        state.reverse = !state.reverse;
      } else {
        commit('resetFilter', payload);
      }
      commit('filterFunction', payload);
    },
    setTheme({ commit, state }, payload) {
      if (state.user.uid !== "") {
        firebase.firestore().collection("users").doc(state.user.uid).update({
          theme: payload
        }).catch(() => {
          firebase.firestore().collection("users").doc(state.user.uid).set({
            theme: payload
          })
        })
      }
      commit('setTheme', payload);
    },
    setLang({ commit, state }, payload) {
      if (state.user.uid !== "") {
        firebase.firestore().collection("users").doc(state.user.uid).update({
          lang: payload
        }).catch(() => {
          firebase.firestore().collection("users").doc(state.user.uid).set({
            lang: payload
          })
        })
      }
      commit('setLang', payload);
    },
    searchText({ commit }, payload) {
      commit('searchText', payload);
    }
  },
  mutations: {
    insertMock(state) {
      state.todos = state.todosMock;
    },
    setUserTodos(state, payload) {
      state.todos = payload;
    },
    setUid(state, payload) {
      state.user.uid = payload
    },
    setUserData(state, payload) {
      if (payload.lang) {
        i18n.locale = payload.lang;
        state.user.lang = payload.lang
      }
      state.user.email = payload.email
      state.user.username = payload.username
      state.user.theme = payload.theme
    },
    clearUserData(state) {
      state.user.uid = ""
      state.user.username = ""
      state.user.theme = "classic"
    },
    changeUsername(state, payload) {
      state.user.username = payload
    },
    todayRendered: (state, payload) => {
      state.today = payload;
    },
    deleteTodo(state, id) {
      state.todos = state.todos.filter(x => x.id !== id)
    },
    deleteAll: state => {
      state.todos = [];
    },
    deleteCompleted: state => {
      state.todos = state.todos.filter(x => !x.completed);
    },
    addTodo: (state, payload) => {
      state.todos = [...state.todos, payload];
    },
    editTodo: (state, payload) => {
      const index = state.todos.findIndex(todo => todo.id === payload.id)
      let newTodos = [...state.todos]
      newTodos.splice(index, 1, payload);
      state.todos = newTodos
    },
    toggleComplete: (state, payload) => {
      const index = state.todos.findIndex(todo => todo.id === payload.id)
      state.todos[index].completed = !state.todos[index].completed;
    },
    resetFilter: (state, payload) => {
      // reset all filters in state.filterBy and turn on the new selected filter
      Object.keys(state.filterBy).forEach(element => {
        state.filterBy[element] = false;
      });
      state.reverse = false;
      state.filterBy[payload] = true;
    },
    filterFunction: (state, payload) => {
      const [x, y] = state.reverse ? [-1, 1] : [1, -1]
      if (payload === "limit") {
        state.todos = state.todos.slice(0)
          .sort((a, b) => (new Date(a.limit) < new Date(b.limit) ? x : y))
          .sort(done => (done.completed ? 1 : -1))
      } else {
        state.todos = state.todos.slice(0).sort((a, b) => (a[payload] < b[payload] ? x : y))
          .sort(done => (done.completed ? 1 : -1))
      }
    },
    setTheme(state, payload) {
      state.user.theme = payload;
    },
    setLang(state, payload) {
      state.user.lang = payload;
      i18n.locale = payload;
    },
    searchText(state, payload) {
      state.search = payload.toLowerCase().trim();
    }
  },
});