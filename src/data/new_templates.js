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
