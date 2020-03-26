// data
// import { uuid } from "./utils"

export default {
  id: "asdf1234",
  tasks: [
    {
      id: "c1",
      type: "chemical",
      ingredients: [
        {
          id: "c1_1",
          name: "PSSS",
          product_number: "243051",
          state: "solution",
          solvent: "water",
          volumn: 250,
          v_unit: "uL",
          concentration: 0.05,
          c_unit: "g/L",
          weight: null,
          w_unit: "g",
          pressure: null,
          p_unit: "Pa"
        }
      ]
    },
    {
      id: "c2",
      type: "chemical",
      ingredients: [
        {
          id: "c2_1",
          name: "NaBH4",
          product_number: "686018",
          state: "solution",
          solvent: "water",
          volumn: 300,
          v_unit: "uL",
          concentration: 10,
          c_unit: "mM",
          weight: null,
          w_unit: "g",
          pressure: null,
          p_unit: "Pa"
        }
      ]
    },
    {
      id: "p1",
      type: "process",
      info: {
        name: "Mix",
        inputs: [
          {
            id: "c1",
            amount: 150
          },
          {
            id: "c2",
            amount: 200
          }
        ],
        gradually: true,
        time: 10,
        output: {
          name: "+"
        }
      }
    },
    {
      id: "c3",
      type: "chemical",
      ingredients: [
        {
          id: "c3_1",
          name: "PSSS",
          product_number: "243051",
          state: "solution",
          solvent: "water",
          volumn: 150,
          v_unit: "uL",
          concentration: 0.05,
          c_unit: "g/L",
          weight: null,
          w_unit: "g",
          pressure: null,
          p_unit: "Pa"
        },
        {
          id: "c3_2",
          name: "NaBH4",
          product_number: "686018",
          state: "solution",
          solvent: "water",
          volumn: 200,
          v_unit: "uL",
          concentration: 10,
          c_unit: "mM",
          weight: null,
          w_unit: "g",
          pressure: null,
          p_unit: "Pa"
        }
      ]
    }
  ]
}
