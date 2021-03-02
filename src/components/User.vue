<template>
  <div class="container">
    <div class="user-info">
      <h1>{{ name }}</h1>
      <h2>{{ nickname }}</h2>
    </div>
    <p>
      {{ balance }}
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
}

.container {
  background-color: var(--color-1);
  border-radius: 10px;
  box-shadow: 0 1px 2px 0.5px var(--washed-gray);

  padding: 1rem 2rem;
  margin: 0 2rem 1rem;
}

.user-info {
  flex-direction: column;
  align-items: flex-start;
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
}

/* balance */
p {
  font-size: 2rem;
  font-weight: 400;
  color: var(--text-blue);
}
</style>