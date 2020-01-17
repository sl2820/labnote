import { uuid } from "./utils"

export default {
  name: "experiment",
  flasks: [
    {
      name: "flask1",
      chemicals: [
        {
          id: uuid(),
          chemical_formula: "AgNO3",
          name: ["silver nitrate"],
          molecular_weight: 169.87,
          product_number: "S7276",
          state: "solution",
          description: "first added"
        },
        {
          id: uuid(),
          chemical_formula: "NaBH4",
          name: ["sodium borohydride", "sodium tetrahydridoborate"],
          molecular_weight: 37.83,
          product_number: "213462",
          state: "solid",
          description: "second added"
        }
      ]
    },
    {
      name: "flask2",
      chemicals: [
        {
          id: uuid(),
          chemical_formula: "C6H8O6",
          name: ["ascorbic acid", "L-ascorbic acid", "vitamin c"],
          molecular_weight: 176.12,
          product_number: "PHR1008",
          state: "solution",
          description: "first added"
        }
      ]
    }
  ]
}
