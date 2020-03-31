<template>
  <div>
    <div>APP MIX</div>
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
