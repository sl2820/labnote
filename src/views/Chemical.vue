<template>
  <div class="chemical-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <div>
        Nickname:
        <input
          type="text"
          class="chemical-input-fields"
          placeholder="Give nick name"
          :value="chemical.nickname"
          @change="update_chemical($event, 'nickname')"
        />
      </div>

      <div class="flex w-full mt-3">
        <div class="justify-start flex-grow mr-10">
          <div v-for="(chem, $chemId) of chemical.ingredients" :key="$chemId">
            <AppIngredient :ingredient="chem" />
          </div>
        </div>

        <div class="justify-end w-1/4 flex-grow-0">
          <AppActionbar />
          <div class="italic text-gray-600 mt-4">
            Write note:
            <textarea
              class="chemical-input-fields w-full"
              :value="chemical.additional"
              placeholder="add notes"
              rows="3"
              @change="update_chemical($event, 'additional')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters(["getTask"]),
    chemical() {
      return this.getTask(this.$route.params.id)
    },
  },
  methods: {
    update_chemical(e, k) {
      this.$store.commit("UPDATE_CHEMICAL", {
        chemical: this.chemical,
        key: k,
        value: e.target.value,
      })
    },
    // toFormula(name) {
    //   let num = name.match(/\d/g)
    //   let sub = []
    //   if (num) {
    //     for (const n of name) {
    //       if (n.match(/\d/)) {
    //         sub.push("<sub>" + n.toString() + "</sub>")
    //       } else {
    //         sub.push(n)
    //       }
    //     }
    //     // console.log(sub)
    //     return sub.join("")
    //   } else {
    //     return name
    //   }
    // },
  },
}
</script>

<style lang="css">
.chemical-view {
  @apply relative flex flex-row  mx-auto bg-white p-4 inset-0 text-left rounded shadow overflow-y-auto;
  margin-top: 7%;
  max-width: 800px;
  min-height: 0%;
  max-height: 80%;
}
.chemical-input-fields {
  @apply bg-teal-100;
}
</style>
