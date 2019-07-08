import Vuex from 'vuex';
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 0,
        title: "Java intro",
        priority: 2,
        category: "Java",
        limit: "2019-08-14",
        completed: false
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
        completed: false
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

  },
  mutations: {

  },
  actions: {

  }
})