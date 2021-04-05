<template>
  <div class="container">
    <div class="user-info">
      <h1>{{ name }}</h1>
      <h2>{{ nickname }}</h2>
    </div>
    <p>
      $ {{ balance }}
    </p>
  </div>
</template>

<script>
export default {
  name: "User",
  props: {
    name: String,
    nickname: String,
    balance: String,
  },
};
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.container {
  width: 100%;

  background-color: var(--color-1);
  border-radius: 10px;
  box-shadow: 0 1px 2px 0.5px var(--washed-gray);

  padding: 1rem 2rem;

  cursor: pointer;
}

.user-info {
  width: 100%;
  margin-bottom: 0.5rem;
}

/* name */
h1 {
  font-weight: 500;
}

/* nickname */
h2 {
  margin-top: 0.2rem;
  font-size: 1.3rem;
  color: var(--gray);
  font-weight: 300;
  /* font-style: italic; */
  font-family: "Source Code Pro", monospace;
}

/* balance */
p {
  font-size: 2rem;
  font-weight: 400;
  color: var(--blue);
  letter-spacing: 0.1rem;
}
</style>