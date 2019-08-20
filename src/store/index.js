import Vuex from 'vuex';
import Vue from 'vue';
import i18n from '../i18n.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: 'classic',
    today: new Date(),
    todayRendered: {},
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
    dateToday(state) {
      // this function seems like it doesn't need to use state,
      // why not just use new Date() (or Date.now() which is more readable) every time?
      // you can also use a library for common tasks like this,
      // check out date-fns https://date-fns.org/
      // import {format} from 'date-fns'
      // const todayFormatted = format(Date.now(), "YYYY/MM/DD")

      let today = state.today;
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
      // looks like you can use const instead of let for 'today' below (always use const unless you must use let)
      let today = state.todayRendered; // I'm confused -- todayRendered starts as an empty object, but you're using it in a subtraction below? maybe it should start as null? (null means 'a human intentionally left this blank')

      // I don't use for loops, they block the main thread in javascript,
      // prefer to use Array methods which can run in parallel
      // (because array operations are operations on independent pieces of an array, they're guaranteed not to interact;
      // in for loops, each iteration might affect the next iteration, so they *must* be run in order):
      state.todos.forEach(todo => {
        const countDown = (new Date(todo.limit) - today) / 86400000; // what's 86400000?
        // might be easier to read like 24 * 60 * 60 * 1000 or something
        // or even better,
        // const ONE_DAY_OF_MS = 24 * 60 * 60 * 1000

        // I like this short if condition "countDown < 0" it's very clear and readable
        if (countDown < 0) count++;
      });
      return count;
    },
  },
  actions: {
    todayRendered({ commit, getters }) {
      const payload = new Date(getters.dateToday);
      commit('todayRendered', payload);
    },
    deleteAll({ commit }) {
      const confirmed = confirm('Are you sure you want to delete all?');
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
      // not sure what's going on here, maybe a good place for some comments explaining this
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
      state.todayRendered = payload;
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
      state.todos.splice(payload.index, 1, payload.changeTodo);
    },
    toggleComplete: (state, index) => {
      state.todos[index].completed = !state.todos[index].completed;
    },
    resetFilter: (state, payload) => {
      Object.keys(state.filterBy).forEach(element => {
        state.filterBy[element] = false;
      });
      state.reverse = false;
      state.filterBy[payload] = true;
    },
    filterFunction: (state, payload) => {
      // confusing variable names, what is x, what is y?
      // let x = 1;
      // let y = -1;
      // could do this instead:
      // const [x,y] = state.reverse? [-1,1] : [1,-1]
      // but if one is always the opposite of the other, do you really need both? (redundant?)
      // if (state.reverse) {
      //   [x, y] = [y, x]
      // }
      const { reverse } = state;
      if (payload === 'limit') {
        state.todos
          // for Array.sort you can use any value, not just 1 or -1 -- positive or negative or 0 is the key
          // so you can even just subtract one value from the other:
          .sort(
            (a, b) =>
              // (check: not sure I'm subtracting the right one first)
              new Date((reverse ? b : a).limit) -
              new Date((reverse ? a : b).limit),
          )
          .sort(done => (done.completed ? 1 : -1));
      } else {
        state.todos
          .sort(
            // (check: not sure I'm subtracting the right one first)
            (a, b) => (reverse ? a : b)[payload] - (reverse ? b : a)[payload],
          )
          .sort(done => (done.completed ? 1 : -1));
      }
    },
    setTheme(state, payload) {
      state.theme = payload;
    },
  },
});
