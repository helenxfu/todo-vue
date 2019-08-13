<template>
  <div class="addNewTask">
    <form @submit.prevent="handleAddTodo()">
      <div class="grow">
        <label>{{$t('table.titleName')}}</label>
        <br />
        <input
          type="text"
          name="title"
          v-model="title"
          :placeholder="$t('forms.inputContentsNew')"
          required
        />
      </div>

      <div class="grow">
        <label>{{$t('table.titleCategory')}}</label>
        <br />
        <input
          type="text"
          v-model="category"
          name="category"
          :placeholder="$t('forms.inputCategory')"
        />
      </div>
      <div>
        <label>{{$t('table.titleLimit')}}</label>
        <br />
        <input v-model="limit" type="date" name="limit" required />
      </div>
      <div class="priorityContainer">
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
      <div class="resetSubmitInput">
        <input type="reset" :value="$t('forms.buttonReset')" />
        <input type="submit" :value="$t('forms.buttonSubmit')" />
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddNewTask",
  data() {
    return {
      title: "",
      priority: 0,
      category: "",
      limit: ""
    };
  },
  computed: { ...mapGetters(["dateToday"]) },
  methods: {
    ...mapActions(["addTodo"]),
    handleAddTodo() {
      const newTodo = {
        id: this.title + Math.floor(Math.random() * 100),
        title: this.title,
        priority: Number(this.priority),
        category: this.category,
        limit: this.limit,
        completed: false
      };
      this.addTodo(newTodo);
      this.title = "";
    }
  },
  created() {
    this.limit = this.dateToday;
  }
};
</script>
