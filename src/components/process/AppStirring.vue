<template>
  <div>
    <div>APP STIRRING</div>
    <div>{{ this_process.info }}</div>
  </div>
</template>

<script>
// {
//     name: "Stirring",
//     chem_for: {
//     id: null
//     },
//     rpm: null,
//     time: 0,
//     heating: false,
//     output: {
//     name: "",
//     property: "after stirring"
//     }
// }
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
