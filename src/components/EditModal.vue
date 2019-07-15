<template>
  <div class="modalMask" @click="$emit('close')">
    <div class="modal" @click.stop>
      <div class="modalHeader">
        <h2>{{$t('forms.titleEditData')}}</h2>
        <button class="xButton" @click="$emit('close')">X</button>
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
    return {
      title: this.todo.title,
      priority: this.todo.priority,
      category: this.todo.category,
      limit: this.todo.limit
    };
  },
  methods: {
    ...mapActions(["editTodo"]),
    handleEditTodo() {
      const changeTodo = {
        id: this.todo.id,
        title: this.title,
        priority: this.priority,
        category: this.category,
        limit: this.limit,
        completed: this.todo.completed
      };
      const index = this.index;
      const payload = { changeTodo, index };
      this.editTodo(payload);
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.modalMask {
  background-color: rgba(113, 168, 168, 0.6);
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  animation-name: modalOpen;
  animation-duration: 1s;
}
.modal {
  background-color: rgb(255, 248, 234);
  border-radius: 10px;
  margin: 0 auto;
  width: 320px;
  padding: 20px;
  position: absolute;
  left: calc(50% - 160px);
  top: 50%;
  margin-top: -190px;
  box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.5);
  animation-name: modalScale;
  animation-duration: 1s;
  animation-timing-function: ease-in;
}
.modalHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
h2 {
  font-size: 20px;
}
.xButton {
  padding: 7px;
  background-color: rgba(255, 255, 255, 0);
}

form > div {
  margin-top: 15px;
}
label {
  font-size: 14px;
}
input {
  border: 1px solid pink;
}
input[type="text"] {
  padding: 10px;
  width: 100%;
}
input[type="radio"] {
  height: 1em;
  margin: 5px 2px;
  cursor: pointer;
}
input[type="date"] {
  padding: 7.5px;
  width: 100%;
}
input[type="date"]::-webkit-inner-spin-button {
  display: none;
}
.btnContainer {
  display: flex;
}
input[type="submit"],
input[type="reset"] {
  flex-grow: 2;
  height: 30px;
  font-size: 14px;
  background-color: rgb(208, 254, 255);
  cursor: pointer;
  transition-property: filter;
  transition-duration: 1s;
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

@keyframes modalOpen {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes modalScale {
  from {
    transform: scale(0.7);
  }
  to {
    transform: scale(1);
  }
}
</style>