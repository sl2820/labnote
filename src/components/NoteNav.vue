<template>
  <div>
    <nav class="navigationbar">
      <div class="flex items-center flex-shrink-0">
        <img
          class="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          src="../assets/icon-transparent.png"
        />
        <span class="font-semibold tracking-tight mr-4">labNote</span>
      </div>
      <div class="font-black text-xl">Acetaminophen synthesis trial 11</div>

      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <button
            class="block lg:inline-block lg:mt-0 hover:text-white mr-4 hover:underline"
            @click="save()"
          >
            Save
          </button>
          <!-- <button
            class="block lg:inline-block lg:mt-0 hover:text-white mr-4 hover:underline"
            @click="load()"
          >
            Load
          </button>
          <button
            class="block lg:inline-block lg:mt-0 hover:text-white mr-4 hover:underline"
            @click="openAnalysis()"
          >
            Analysis
          </button> -->
          <button
            class="block lg:inline-block lg:mt-0 hover:text-white mr-4 hover:underline"
            @click="refresh()"
          >
            Refresh
          </button>
        </div>
        <!-- <button
          class="block font-medium lg:inline-block lg:mt-0 hover:text-white mr-2 hover:underline"
        >
          🧑🏻‍🔬Sukjoo Hong
        </button> -->
        <input
          class="user_id"
          type="text"
          placeholder="user id"
          v-model="user_id"
          @change="updateTestId($event)"
        />
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_id: "",
    }
  },
  methods: {
    save() {
      this.$store.commit("SAVE_PROJECT", {
        note_data: localStorage.getItem("note"),
      })
    },
    load() {
      this.$store.commit("LOAD_PROJECT", {
        projectID: 2,
      })
    },
    openAnalysis() {
      this.$router.push({ name: "analysis", params: { id: this.note.id } })
    },
    refresh() {
      localStorage.clear()
      location.reload()
    },
    updateTestId(e) {
      this.$store.commit("UPDATE_TEST_ID", {
        test_id: e.target.value,
      })
    },
  },
}
</script>

<style lang="css">
.navigationbar {
  @apply flex items-center justify-between flex-wrap mb-3 text-white w-screen shadow bg-gray-500 fixed;
  /* background-color: rgb(119, 182, 109); */
}
.user_id {
  @apply bg-white mr-1 text-black;
}
::-webkit-input-placeholder {
  text-align: center;
}
</style>
