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
      product_number: "",
      amount: "", // 25uL or 40kg
      state: "", // solid, solution, liquid, gas, mixed(mixed, added, injected)
      concentration: "",
      pressure: "",
      property: [],
      sources: [], // source chemicals from inputs of Mix, Add, and Inject
    },
  },

  new_chemical_example1: {
    id: "1q2w3e4r",
    type: "chemical",
    additional: "This is my memo.",
    info: {
      display: "AgNO3",
      nickname: null,
      product_number: "7d8yav",
      amount: "123uL",
      state: "solution",
      concentration: "15mM",
      pressure: "1.5pa",
      property: ["after heating", "on an water bath"],
      sources: [],
    },
  },

  new_chemical_example2: {
    id: "t34g34tsg",
    type: "chemical",
    additional: "Hello there :)",
    info: {
      display: "hello + PSSS + NaBH4",
      nickname: "precursor",
      product_number: null,
      amount: "300mL",
      state: "mixed",
      concentration: null, // not possible
      pressure: null, // not possible
      property: ["mixed"],
      sources: [
        {
          id: "28fhiwef",
          amount: "11mL",
        },
        {
          id: "34g738fs",
          amount: "50uL",
        },
        {
          id: "29834u938",
          amount: "2uL",
        },
      ],
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
