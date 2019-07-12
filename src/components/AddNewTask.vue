<template>
  <div>
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
      <div class="priority">
        <label>{{$t('forms.titlePriority')}}</label>
        <div class="priorityButtons">
          <label>
            <input v-model="priority" type="radio" name="priority" value="0" />
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
      <input type="reset" :value="$t('forms.buttonReset')" />
      <input type="submit" :value="$t('forms.buttonSubmit')" />
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
        priority: this.priority,
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

<style scoped>
form {
  display: flex;
  margin-bottom: 10px;
}
label {
  font-size: 12px;
}
.grow {
  flex-grow: 2;
}
.priority {
  padding: 0 8px;
}
.priorityButtons {
  margin-top: 3px;
}
input {
  border: 1px solid pink;
}
input[type="text"] {
  padding: 5px;
  width: 100%;
}
input[type="radio"] {
  height: 1em;
  margin: 5px 2px;
  cursor: pointer;
}
input[type="date"] {
  padding: 2.5px;
}
input[type="date"]::-webkit-inner-spin-button {
  display: none;
}
input[type="submit"],
input[type="reset"] {
  width: 50px;
  height: 22px;
  border-radius: 7px;
  background-color: rgb(208, 254, 255);
  cursor: pointer;
  transition-property: filter;
  transition-duration: 1s;
  align-self: flex-end;
}
input[type="submit"] {
  background-color: rgb(248, 247, 155);
}
input[type="submit"]:hover,
input[type="reset"]:hover {
  filter: hue-rotate(270deg);
}
input[type="submit"]:active,
input[type="reset"]:active {
  transform: translateY(1px);
}
</style>