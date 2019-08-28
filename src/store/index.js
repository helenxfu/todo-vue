import Vuex from 'vuex';
import Vue from 'vue';
import i18n from '../i18n.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: 'classic',
    today: "", //renders today through todayRendered method on create App.vue to format today to the 0AM time and store the value here
    reverse: false,
    filterBy: {
      priority: false,
      category: false,
      title: false,
      limit: false,
    },
    todos: [
      {
        id: 0,
        title: 'Java intro',
        priority: 2,
        category: 'Java',
        limit: '2020-08-14',
        completed: false,
      },
      {
        id: 1,
        title: 'Vue Todo',
        priority: 2,
        category: 'Vue',
        limit: '2019-08-14',
        completed: false,
      },
      {
        id: 2,
        title: 'React course',
        priority: 1,
        category: 'React',
        limit: '2019-12-20',
        completed: false,
      },
      {
        id: 3,
        title: 'React Calendar',
        priority: 1,
        category: 'React',
        limit: '2019-11-30',
        completed: false,
      },
      {
        id: 4,
        title: 'CS50',
        priority: 0,
        category: 'YouTube',
        limit: '2020-09-12',
        completed: false,
      },
      {
        id: 5,
        title: 'Illustrator crashcourse',
        priority: 0,
        category: 'Adobe',
        limit: '2020-08-22',
        completed: false,
      },
      {
        id: 6,
        title: 'InDesign',
        priority: 0,
        category: 'Adobe',
        limit: '2021-09-02',
        completed: false,
      },
      {
        id: 7,
        title: 'Java intro',
        priority: 2,
        category: 'AAA',
        limit: '2020-08-14',
        completed: false,
      },
      {
        id: 8,
        title: 'AAA',
        priority: 0,
        category: 'AAA',
        limit: '2020-02-14',
        completed: false,
      },
      {
        id: 9,
        title: 'AAB',
        priority: 2,
        category: 'AAA',
        limit: '2020-03-14',
        completed: false,
      },
      {
        id: 10,
        title: 'BBB',
        priority: 2,
        category: 'AAA',
        limit: '2020-01-14',
        completed: false,
      },
      {
        id: 11,
        title: 'AAB',
        priority: 1,
        category: 'BBB',
        limit: '2020-02-14',
        completed: false,
      },
    ],
  },
  getters: {
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
      let today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      if (mm < 10) {
        mm = '0' + mm;
      }
      if (dd < 10) {
        dd = '0' + dd;
      }
      today = yyyy + '-' + mm + '-' + dd;
      return today;
    },
    overdue(state) {
      let count = 0;
      let today = state.today;
      state.todos.forEach(todo => {
        const MS_IN_ONE_DAY = 1000 * 60 * 60 * 24;
        const countDown = (new Date(todo.limit) - today) / MS_IN_ONE_DAY;
        if (countDown < 0) count++;
      });
      return count;
    },
  },
  actions: {
    todayRendered({ commit, getters }) {
      const payload = new Date(getters.dateToday); //resets Date value to 0:00AM
      commit('todayRendered', payload);
    },
    deleteAll({ commit }) {
      const confirmed = confirm(i18n.t('text.confirm'));
      if (confirmed) {
        commit('deleteAll');
      }
    },
    deleteCompleted({ commit }) {
      commit('deleteCompleted');
    },
    deleteTodo({ commit }, index) {
      commit('deleteTodo', index);
    },
    addTodo(context, payload) {
      context.commit('addTodo', payload);
    },
    editTodo({ commit }, payload) {
      commit('editTodo', payload);
    },
    toggleComplete({ commit }, index) {
      commit('toggleComplete', index);
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
    setTheme({ commit }, payload) {
      commit('setTheme', payload);
    },
  },
  mutations: {
    todayRendered: (state, payload) => {
      state.today = payload;
    },
    deleteTodo(state, index) {
      state.todos.splice(index, 1);
    },
    deleteAll: state => {
      state.todos = [];
    },
    deleteCompleted: state => {
      state.todos = state.todos.filter(x => !x.completed);
    },
    addTodo: (state, payload) => {
      state.todos.push(payload);
    },
    editTodo: (state, payload) => {
      state.todos.splice(payload.index, 1, payload.todoUpdate);
    },
    toggleComplete: (state, index) => {
      state.todos[index].completed = !state.todos[index].completed;
    },
    resetFilter: (state, payload) => {
      //reset all filters in state.filterBy and turn on the new selected filter
      Object.keys(state.filterBy).forEach(element => {
        state.filterBy[element] = false;
      });
      state.reverse = false;
      state.filterBy[payload] = true;
    },
    filterFunction: (state, payload) => {
      const [x, y] = state.reverse ? [-1, 1] : [1, -1]
      if (payload === "limit") {
        state.todos
          .sort((a, b) => (new Date(a.limit) < new Date(b.limit) ? x : y))
          .sort(done => (done.completed ? 1 : -1))
      } else {
        state.todos.sort((a, b) => (a[payload] < b[payload] ? x : y))
          .sort(done => (done.completed ? 1 : -1))
      }
    },
    setTheme(state, payload) {
      state.theme = payload;
    },
  },
});