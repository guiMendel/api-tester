<template>
  <div>
    <section>
      <span class="method">{{ method }}</span>
      <span class="path">{{ path }}</span>
    </section>
    <span class="timestamp">{{ timestamp }}</span>
  </div>
</template>

<script>
export default {
  name: "RequestSummary",
  props: {
    method: String,
    path: String,
    timestamp: String,
  },
};
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
}

section {
  display: flex;
  align-items: center;
}

.method {
  text-transform: uppercase;
  color: var(--text-green);
  font-size: 1.3rem;
  margin-right: 1rem;
}

.path {
  font-style: italic;
  color: white;
}

.timestamp {
  color: white;
}

</style>