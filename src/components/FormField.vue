<template>
  <label :for="name">{{ title }}</label>
  <input
    :type="target.type ?? 'text'"
    :id="name"
    v-model="target.value"
    @blur="updateField()"
  />
  <!-- as mensagens de erro aparecem se o error -->
  <small v-show="errorMessage">{{ errorMessage }}</small>
  <em v-if="target.tip" class="tip">{{ target.tip }}</em>
</template>

<script>
export default {
  name: "FormField",
  props: {
    name: String,
    target: Object,
    // Returns the error message in case the user inputted something invalid
    checkForError: Function,
  },
  emits: ["update"],
  data: () => ({
    errorMessage: "",
  }),
  computed: {
    // Name with capitalized words
    title() {
      return (
        this.name
          .split(" ")
          // Capitalizes first letter
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    },
  },
  methods: {
    updateField() {
      this.errorMessage = this.checkForError(this.target.value);
    },
  },
};
</script>

<style scoped>
em {
  font-weight: 300;
  color: var(--text-light);
  margin-top: 0.5rem;
}

label {
  margin-top: 1rem;
  font-size: 1.3rem;
}

input {
  margin-top: 0.5rem;
  border: 1px solid var(--light-gray);
  border-radius: 10px;
  background-color: var(--color-1);

  width: 100%;
  padding: 0.5rem 0.5rem;
}

small {
  font-size: 1rem;
  font-style: italic;
  color: var(--text-red);
}
</style>