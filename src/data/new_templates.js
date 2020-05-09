import { uuid } from "@/utils"

export default {
  name: "new_templates",

  new_column: {
    id: null,
    name: "",
    tasks: [],
  },

  new_chemical: {
    id: null,
    type: "chemical",
    nickname: null,
    additional: "",
    ingredients: [
      {
        id: uuid(),
        name: "",
        product_number: "",
        state: "",
        solvent: "",
        volume: null,
        v_unit: "",
        concentration: null,
        c_unit: "",
        weight: null,
        w_unit: "",
        pressure: null,
        p_unit: "",
        property: [],
      },
    ],
  },

  new_chemical_edited: {
    id: null,
    type: "chemical",
    additional: "",
    info: {
      display: "", // whatever a user inputs (name or formula)
      nickname: null,
      product_number: null,
      amount: null, // 25uL or 40kg
      state: null, // solid, solution, liquid, gas, mixed(mixed, added, injected)
      solvent: null, // solution
      volume: null, // solution & gas & liquid
      weight: null, // solid
      concentration: null, // solution
      pressure: null, // gas
      v_unit: null,
      w_unit: null,
      c_unit: null,
      p_unit: null,
      property: [],
      sources: [], // source chemicals from inputs of Mix, Add, and Inject
    },
  },

  new_process: {
    id: null,
    type: "process",
    additional: "",
    info: {
      name: "",
    },
  },

  new_memo: {
    id: null,
    type: "memo",
    info: {
      title: "",
      description: "",
    },
  },
}
