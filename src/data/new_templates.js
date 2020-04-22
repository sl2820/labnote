import { uuid } from "@/utils"

export default {
  name: "new_templates",

  new_chemical: {
    id: null,
    type: "chemical",
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
        w_unit: "g",
        pressure: null,
        p_unit: "Pa",
        property: [],
      },
    ],
  },

  new_process: {
    id: null,
    type: "process",
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
