import Vuex from 'vuex';
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    today: new Date(),
    todos: [
      {
        id: 0,
        title: "Java intro",
        priority: 2,
        category: "Java",
        limit: "2019-08-14",
        completed: true
      },
      {
        id: 1,
        title: "Vue Todo",
        priority: 2,
        category: "Vue",
        limit: "2019-07-11",
        completed: false
      },
      {
        id: 2,
        title: "React course",
        priority: 1,
        category: "React",
        limit: "2019-07-22",
        completed: false
      },
      {
        id: 3,
        title: "React Calendar",
        priority: 1,
        category: "React",
        limit: "2019-07-30",
        completed: false
      },
      {
        id: 4,
        title: "CS50",
        priority: 0,
        category: "YouTube",
        limit: "2019-09-12",
        completed: false
      },
      {
        id: 5,
        title: "Illustrator crashcourse",
        priority: 0,
        category: "Adobe",
        limit: "2019-08-22",
        completed: true
      },
      {
        id: 6,
        title: "InDesign",
        priority: 0,
        category: "Adobe",
        limit: "2019-09-02",
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
      return getters.todoLength === 0 ? "no" :
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
    }
  },
  actions: {
    deleteAll({ commit }) {
      let confirmed = confirm("Are you sure you want to delete all?")
      if (confirmed) {
        commit('deleteAll')
      }
    },
    deleteCompleted({ commit }) {
      commit('deleteCompleted')
    },
    deleteTodo({ commit }, id) {
      commit('deleteTodo', id)
    },
    addTodo(context, payload) {
      context.commit('addTodo', payload)
    }
  },
  mutations: {
    deleteTodo(state, id) {
      this.state.todos = state.todos.filter(x => x.id !== id)
    },
    deleteAll: state => {
      state.todos = [];
    },
    deleteCompleted: state => {
      state.todos = state.todos.filter(x => !x.completed)
    },
    addTodo: (state, payload) => {
      state.todos.push(payload)
    }

  }
})