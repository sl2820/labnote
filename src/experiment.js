import { uuid } from "./utils"

export default {
  name: "experiment",
  flasks: [
    {
      name: "flask1",
      id: uuid(),
      chemicals: [
        {
          id: uuid(),
          nickname: "hngskj",
          formula: "AgNO3",
          name: "silver nitrate",
          molecular_weight: 169.87,
          product_number: "S7276",
          state: "solution",
          description: "first added"
        },
        {
          id: uuid(),
          nickname: "",
          formula: "NaBH4",
          name: "sodium borohydride",
          molecular_weight: 37.83,
          product_number: "213462",
          state: "solid",
          description: "second added"
        }
      ]
    },
    {
      name: "flask2",
      id: uuid(),
      chemicals: [
        {
          id: uuid(),
          nickname: "",
          formula: "C6H8O6",
          name: "ascorbic acid",
          molecular_weight: 176.12,
          product_number: "PHR1008",
          state: "solution",
          description: "first added"
        }
      ]
    }
  ]
}
