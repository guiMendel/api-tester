<template>
  <div :style="appearLogic" class="container">
    <div class="user-info">
      <h1>{{ name }}</h1>
      <h2>{{ nickname }}</h2>
    </div>
    <p>$ {{ balance }}</p>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      // simply turns to true after the provided delay, making the user actually show
      ready: false,
    };
  },
  computed: {
    appearLogic() {
      return {
        opacity: this.ready ? "1" : "0",
        top: this.ready ? "0" : "3rem",
      };
    },
  },
  props: {
    name: String,
    nickname: String,
    balance: String,
    showDelay: Number,
  },
  created() {
    // appears after the delay
    setTimeout(() => (this.ready = true), this.showDelay);
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
  position: relative;
  z-index: 0;
  
  width: 100%;

  background-color: var(--color-1);
  border-radius: 10px;
  box-shadow: 0 1px 2px 0.5px var(--washed-gray);

  padding: 1rem 2rem;

  transition: all 600ms;

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