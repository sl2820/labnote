import { uuid } from "./utils"

export default {
  name: "experiment",
  rows: [
    {
      name: "flask",
      product_infos: [
        {
          id: uuid(),
          chemical_formula: null,
          name: "empty",
          molecular_weight: null,
          product_number: null
        }
      ],
      custom_infos: [
        {
          state: null
        }
      ]
    }
  ]
}
