<template>
  <div class="modalMask" @click="$emit('close')">
    <div class="modal" @click.stop>
      <div class="modalHeader">
        <h2>{{$t('forms.titleEditData')}}</h2>
        <button class="xButton" @click="$emit('close')">
          <svg style="width: 20px" viewBox="0 0 18.17 18.17">
            <title>cross</title>
            <line class="cross" x1="1.5" y1="1.5" x2="16.67" y2="16.67" />
            <line class="cross" x1="1.5" y1="16.67" x2="16.67" y2="1.5" />
          </svg>
        </button>
      </div>
      <div>
        <form @submit.prevent="handleEditTodo()">
          <div>
            <label>{{$t('table.titleName')}}</label>
            <br />
            <input
              type="text"
              name="title"
              v-model="title"
              :placeholder="$t('forms.inputContentsEdit')"
              required
            />
          </div>

          <div>
            <label>{{$t('table.titleCategory')}}</label>
            <br />
            <input
              type="text"
              v-model="category"
              name="category"
              :placeholder="$t('forms.inputCategoryEdit')"
            />
          </div>
          <div>
            <label>{{$t('table.titleLimit')}}</label>
            <br />
            <input v-model="limit" type="date" name="limit" required />
          </div>
          <div class="formPaddingRight">
            <label>{{$t('forms.titlePriority')}}</label>
            <div class="priorityButtons">
              <label>
                <input v-model="priority" type="radio" name="priority" value="0" checked required />
                {{$t('table.priorityLow')}}
              </label>
              <label>
                <input v-model="priority" type="radio" name="priority" value="1" />
                {{$t('table.priorityMid')}}
              </label>
              <label>
                <input v-model="priority" type="radio" name="priority" value="2" />
                {{$t('table.priorityHigh')}}
              </label>
            </div>
          </div>
          <div class="btnContainer">
            <input type="reset" :value="$t('forms.buttonReset')" />
            <input type="submit" :value="$t('forms.buttonSubmitEdit')" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "EditModal",
  props: {
    todo: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    // return {
    //   title: this.todo.title,
    //   priority: this.todo.priority,
    //   category: this.todo.category,
    //   limit: this.todo.limit
    // };
    // does this work?
    return this.todo;
    // otherwise, (shallow-)clone the object?
    // return {...this.todo}
    // if the object has nested object inside, you'd have to deep clone:
    // import {cloneDeep} from 'lodash'
    // return cloneDeep(this.todo)
    // if you don't care about performance you can hack a cloneDeep together real quick:
    // return JSON.parse(JSON.stringify(this.todo))
  },
  watch: {
    // 😲😲😲
    // eslint-disable-next-line no-unused-vars
    todo(newVal, oldVal) {
      // looks a little repetitive
      // I wonder if there's a way to be easier on your fingers?
      this.title = this.todo.title;
      this.priority = this.todo.priority;
      this.category = this.todo.category;
      this.limit = this.todo.limit;
    }
  },
  methods: {
    ...mapActions(["editTodo"]),
    handleEditTodo() {
      // changeTodo sounds like a function name (verb), do you mean changedTodo? updatedTodo?
      // const changeTodo = {
      // repetitive, is there a better way?
      //   id: this.todo.id,
      //   title: this.title,
      //   priority: this.priority,
      //   category: this.category,
      //   limit: this.limit,
      //   completed: this.todo.completed
      // };
      // maybe...? not sure if this works
      const { title, priority, category, limit, index } = this;
      // a tiny bit cleaner (if it works)
      const changedTodo = { ...this.todo, title, priority, category, limit };

      const payload = { changedTodo, index };
      this.editTodo(payload);
      this.$emit("close");
    }
  }
};
</script>
