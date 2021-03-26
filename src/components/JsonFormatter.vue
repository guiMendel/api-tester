<template>
  <div v-html="text"></div>
</template>

<script>
import parse from "../helpers/objectParser";

export default {
  name: "JsonFormatter",
  props: {
    object: Object,
  },
  computed: {
    text() {
      return parse(this.object);
    },
  },
};
</script>

<style scoped>
div {
  width: 100%;
  text-align: start;
  font-family: "Source Code Pro", monospace;
  font-weight: 600;

  display: flex;
  flex-direction: column;
}
</style>

<style>
.json-line {
  margin-left: .8rem;
}

.json-key {
  color: var(--text-orange);
  font-style: italic;
}

.json-string {
  color: var(--text-blue);
}

.json-number,
.json-null,
.json-boolean {
  color: var(--text-violet);
}
</style>