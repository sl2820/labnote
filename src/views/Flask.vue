<template>
  <div>
    <h1>This is an Flask page</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters(["getFlask"]),
    flask() {
      return this.getFlask(this.$route.params.id)
    }
  }
}
</script>

<style scoped></style>
