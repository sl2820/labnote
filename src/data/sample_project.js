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
      inputs: ["c1", "c2"],
      details: {
        reactive: false,
        method: "Inject"
      },
      output: "c3"
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
          volumn: 250,
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
      id: "c4",
      type: "chemical",
      ingredients: [
        {
          id: "c4_1",
          name: "AgNO3",
          product_number: "S7276",
          state: "solution",
          solvent: "water",
          volumn: 5,
          v_unit: "mL",
          concentration: 0.5,
          c_unit: "mM",
          weight: null,
          w_unit: "g",
          pressure: null,
          p_unit: "Pa"
        }
      ]
    },
    {
      id: "p2",
      type: "process",
      inputs: ["c3", "c4"],
      details: {
        reactive: true,
        method: "Mix",
        detail: "Stir",
        instrument: "Syringe",
        rpm: 100,
        temperature: 27
      },
      output: "c5"
    },
    {
      id: "c5",
      type: "chemical",
      ingredients: [
        {
          id: "c5_1",
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
        },
        {
          id: "c5_2",
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
        },
        {
          id: "c5_3",
          name: "AgNO3",
          product_number: "S7276",
          state: "solution",
          solvent: "water",
          volumn: 5,
          v_unit: "mL",
          concentration: 0.5,
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
