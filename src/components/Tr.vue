<template>
  <tr>
    <td class="centering">
      <input type="checkbox" name="completed">
      {{todo.priority}}
    </td>
    <td>{{todo.category}}</td>
    <td>{{todo.title}}</td>
    <td>{{todo.limit}}</td>
    <td class="rightAlign">{{todo.id}} Days</td>
    <td class="centering">
      <button @click="toggleModal">Edit</button>
      <button @click="$emit('delete-todo', todo.id)">X</button>
      <EditModal :todo="todo" :class="{hideMe : hidden}"/>
    </td>
  </tr>
</template>

<script>
import EditModal from "./EditModal";

export default {
  name: "Tr",
  props: {
    todo: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    EditModal
  },
  data() {
    return {
      hidden: true
    };
  },
  methods: {
    toggleModal() {
      this.myModal = !this.myModal;
    }
  }
};
</script>

<style scoped>
td {
  border: 1px solid rgb(221, 221, 221);
  padding: 2px 2px;
}
button:hover {
  background-color: rgb(220, 193, 255);
}
.hideMe {
  display: none;
}
.centering {
  text-align: center;
}
.rightAlign {
  text-align: right;
}
</style>