<template>
  <div>
    <header>
      <span
        v-for="(tab, index) in tabs"
        :key="tab"
        :class="index == activeTab && 'active'"
        @click="activeTab = index"
        >{{ tab }}</span
      >
    </header>
    <main>
      <section
        v-for="(tab, index) in tabs"
        :key="tab"
        :class="index == activeTab && 'active'"
      >
        <slot :name="tab.toLowerCase()">
          <p class="missing-slot">{{ defaultMessage }}</p>
        </slot>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "TabView",
  props: {
    tabs: Array,
    defaultMessage: {
      type: String,
      default: "Nothing to see here...",
    },
  },
  data: () => ({
    activeTab: 0,
  }),
};
</script>

<style scoped>
header {
  width: 100%;
  display: flex;
  align-items: flex-end;

  padding: 0 1.5rem;
}

span {
  background-color: var(--dark);
  padding: 0.5rem;
  flex: 1;
  border-radius: 20px 20px 0 0;

  font-size: 1.2rem;
  text-transform: capitalize;
  filter: brightness(0.8) grayscale(20%);

  transition: all 150ms;
}

span.active {
  filter: none;
}

main {
  background-color: var(--dark);
  border-radius: 20px;
  padding: 1rem;
}

section {
  display: none;
}

section.active {
  display: initial;
}

.missing-slot {
  margin: 1rem;
  font-size: 1.2rem;
}
</style>