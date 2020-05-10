<template>
  <div>
    <div class="overflow-y-auto">
      <div class="font-bold text-sm text-gray-500 mb-1">ACTIONS</div>
      <div>
        <ActionButton
          ><b-icon class="mr-2" icon="files"></b-icon>Duplicate</ActionButton
        >
      </div>
      <div>
        <ActionButton
          ><b-icon class="mr-2" icon="star"></b-icon>Star</ActionButton
        >
      </div>
      <div>
        <ActionButton
          ><b-icon class="mr-2" icon="link"></b-icon>Share</ActionButton
        >
      </div>
      <div>
        <ActionButton
          ><b-icon class="mr-2" icon="trash"></b-icon>Remove</ActionButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton"

export default {
  components: { ActionButton },
}
</script>

<style lang="css"></style>
