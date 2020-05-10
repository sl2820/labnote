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
    info: {
      display: "", // whatever a user inputs (name or formula)
      nickname: null,
      product_number: null,
      state: null, // solid, solution, liquid, gas, compound(mixed, added, injected)
      solvent: null, // solution
      volume: null, // solution & gas & liquid
      weight: null, // solid
      concentration: null, // solution
      pressure: null, // gas
      amount: null, // compound (25uL or 40kg)
      v_unit: null,
      w_unit: null,
      c_unit: null,
      p_unit: null,
      property: [],
      sources: [], // source chemicals from inputs of Mix, Add, and Inject
      additional: "",
    },
  },

  new_process: {
    id: null,
    type: "process",
    info: {
      name: "",
      additional: "",
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
