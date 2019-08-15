import Vuex from 'vuex';
import Vue from 'vue';
import i18n from '../i18n.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'classic',
    today: new Date(),
    todayRendered: {},
    reverse: false,
    filterBy: {
      priority: false, category: false, title: false, limit: false
    },
    todos: [
      {
        id: 0,
        title: "Java intro",
        priority: 2,
        category: "Java",
        limit: "2020-08-14",
        completed: false
      },
      {
        id: 1,
        title: "Vue Todo",
        priority: 2,
        category: "Vue",
        limit: "2019-08-14",
        completed: false
      },
      {
        id: 2,
        title: "React course",
        priority: 1,
        category: "React",
        limit: "2019-12-20",
        completed: false
      },
      {
        id: 3,
        title: "React Calendar",
        priority: 1,
        category: "React",
        limit: "2019-11-30",
        completed: false
      },
      {
        id: 4,
        title: "CS50",
        priority: 0,
        category: "YouTube",
        limit: "2020-09-12",
        completed: false
      },
      {
        id: 5,
        title: "Illustrator crashcourse",
        priority: 0,
        category: "Adobe",
        limit: "2020-08-22",
        completed: false
      },
      {
        id: 6,
        title: "InDesign",
        priority: 0,
        category: "Adobe",
        limit: "2021-09-02",
        completed: false
      }
    ]
  },
  getters: {
    todoLength: state => {
      return state.todos.length
    },
    todoCompleted: state => {
      return state.todos.filter(x => x.completed).length
    },
    completionRate: (state, getters) => {
      return getters.todoLength === 0 ? i18n.t('status.noTasks') :
        Math.round((getters.todoCompleted / getters.todoLength) * 100) + "%"
    },
    dateToday(state) {
      let today = state.today
      const yyyy = today.getFullYear()
      let mm = today.getMonth() + 1
      let dd = today.getDate()
      if (mm < 10) {
        mm = '0' + mm
      }
      if (dd < 10) {
        dd = '0' + dd
      }
      today = yyyy + '-' + mm + '-' + dd
      return today
    },
    overdue(state) {
      let count = 0
      let today = state.todayRendered
      for (let i = 0; i < state.todos.length; i++) {
        const countDown =
          (new Date(state.todos[i].limit) - today) /
          86400000;
        if (countDown < 0) count++
      }
      return count
    }
  },
  actions: {
    todayRendered({ commit, getters }) {
      const payload = new Date(getters.dateToday)
      commit('todayRendered', payload)
    },
    deleteAll({ commit }) {
      let confirmed = confirm("Are you sure you want to delete all?")
      if (confirmed) {
        commit('deleteAll')
      }
    },
    deleteCompleted({ commit }) {
      commit('deleteCompleted')
    },
    deleteTodo({ commit }, index) {
      commit('deleteTodo', index)
    },
    addTodo(context, payload) {
      context.commit('addTodo', payload)
    },
    editTodo({ commit }, payload) {
      commit('editTodo', payload)
    },
    toggleComplete({ commit }, index) {
      commit('toggleComplete', index)
    },
    filterFunction({ commit, state }, payload) {
      if (state.filterBy[payload] === true) {
        state.reverse = !state.reverse
      } else {
        commit('resetFilter', payload)
      }
      commit('filterFunction', payload)
    },
    setTheme({ commit }, payload) {
      commit('setTheme', payload)
    }
  },
  mutations: {
    todayRendered: (state, payload) => {
      state.todayRendered = payload
    },
    deleteTodo(state, index) {
      state.todos.splice(index, 1)
    },
    deleteAll: state => {
      state.todos = [];
    },
    deleteCompleted: state => {
      state.todos = state.todos.filter(x => !x.completed)
    },
    addTodo: (state, payload) => {
      state.todos.push(payload)
    },
    editTodo: (state, payload) => {
      state.todos.splice(payload.index, 1, payload.changeTodo)
    },
    toggleComplete: (state, index) => {
      state.todos[index].completed = !state.todos[index].completed
    },
    resetFilter: (state, payload) => {
      Object.keys(state.filterBy).forEach(element => {
        state.filterBy[element] = false
      });
      state.reverse = false
      state.filterBy[payload] = true
    },
    filterFunction: (state, payload) => {
      let x = 1
      let y = -1
      if (state.reverse) {
        [x, y] = [y, x]
      }
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
    }
  }
})