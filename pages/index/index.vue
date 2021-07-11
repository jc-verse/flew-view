<template>
  <div>
    <div @click="countFn">{{ count }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 0,
      };
    },
    methods: {
      countFn() {
        this.count++;
      },
    },
  };
</script>
