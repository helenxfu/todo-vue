<template>
  <div class="modalMask" @click="$emit('close')">
    <div class="modal" style="top: calc(50% - 193px)" @click.stop>
      <div class="modalHeader">
        <h2>{{$t('forms.titleEditData')}}</h2>
        <button @click="$emit('close')">
          <CrossSVGIcon />
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
                <input v-model="priority" type="radio" name="priority" :value="0" checked required />
                {{$t('table.priorityLow')}}
              </label>
              <label>
                <input v-model="priority" type="radio" name="priority" :value="1" />
                {{$t('table.priorityMid')}}
              </label>
              <label>
                <input v-model="priority" type="radio" name="priority" :value="2" />
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
import CrossSVGIcon from "./SVG/CrossSVGIcon";
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
  components: {
    CrossSVGIcon
  },
  data() {
    return { ...this.todo };
  },
  watch: {
    todo() {
      const { title, priority, category, limit } = this.todo;
      [this.title, this.priority, this.category, this.limit] = [
        title,
        Number(priority),
        category,
        limit
      ];
    }
  },
  methods: {
    ...mapActions(["editTodo"]),
    handleEditTodo() {
      const { title, priority, category, limit } = this;
      const todoUpdate = { ...this.todo, title, priority, category, limit };
      this.editTodo(todoUpdate);
      this.$emit("close");
    }
  }
};
</script>
