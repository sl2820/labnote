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
          nickname: "base",
          formula: "AgNO3",
          name: "silver nitrate",
          molecular_weight: 169.87,
          product_number: "S7276",
          state: "solution",
          description: "first added"
        },
        // {
        //   id: uuid(),
        //   nickname: "",
        //   formula: "NaBH4",
        //   name: "sodium borohydride",
        //   molecular_weight: 37.83,
        //   product_number: "213462",
        //   state: "solid",
        //   description: "second added"
        // },
        {
          id: uuid(),
          nickname: "",
          formula: "(C8H7NaO3S)n",
          name: "Poly(sodium 4-styrenesulfonate)",
          molecular_weight: 1000000,
          product_number: "434574",
          state: "solution",
          description: ""
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
        },
        {
          id: uuid(),
          nickname: "",
          formula: "HOC(COONa)(CH2COONa)2 · 2H2O",
          name: "sodium citrate tribasic dihydrate",
          molecular_weight: 0,
          product_number: "C3434",
          state: "solution",
          description: "check before merge"
        }
      ]
    }
  ]
}
