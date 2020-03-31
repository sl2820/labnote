<template>
  <div>
    <div>APP INJECT</div>
    <div>{{ this_process.info }}</div>
  </div>
</template>

<script>
export default {
  props: {
    this_process: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
