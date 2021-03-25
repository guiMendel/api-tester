<template>
  <div>
    <div class="body">
      <section>
        <span class="method">{{ method }}</span>
        <span class="path">{{ path }}</span>
      </section>
      <section :style="statusStyle">
        <span class="status">{{ response.status }}</span>
        <span class="statusText">{{
          response.statusText
        }}</span>
      </section>
    </div>
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
    response: Object,
  },
  data() {
    return {
      statusStyle: {
        "--status-color":
          this.response.status >= 400
            ? "var(--text-yellow)"
            : "var(--text-green)",
      },
    };
  },
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: "Source Code Pro", monospace;
  font-weight: 300;
}

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  background-color: var(--dark);
  padding: 1rem;
  border-radius: 20px 20px 0 0;
}

.body > * + * {
  margin-top: 0.5rem;
}

section {
  display: flex;
  align-items: center;
  color: white;
}

section > * + * {
  margin-left: 0.5rem;
}

.method {
  text-transform: uppercase;
  /* color: var(--text-green); */
  font-size: 1.3rem;
  font-weight: 600;
}

.path {
  font-style: italic;
}

.status,
.statusText {
  font-size: 1.3rem;
}

.status {
  color: var(--status-color);
  font-weight: 600;
}

.timestamp {
  text-align: end;

  padding: 0.2rem 1.5rem;
  border-radius: 0 0 20px 20px;
  color: var(--light-gray);
  font-size: 0.9rem;
  background-color: var(--darker);
  width: 100%;
}
</style>