<template>
  <div class="textFilterContainer">
    <input
      type="text"
      v-model="filterText"
      name="text-filter"
      :placeholder="$t('forms.inputFilterText')"
      @keyup="handleTextChange"
    />
    <input
      type="button"
      name="clear-text"
      :value="$t('forms.buttonClearFilter')"
      @click="clearInput"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TextFilter",
  data() {
    return {
      filterText: ""
    };
  },
  methods: {
    clearInput() {
      this.filterText = "";
      this.handleTextChange();
    },
    handleTextChange() {
      this.$store.dispatch("searchText", this.filterText);
    }
  },
  computed: {
    ...mapState(["search"])
  },
  watch: {
    search() {
      this.filterText = this.search;
    }
  }
};
</script>