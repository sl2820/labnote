// data
// import { uuid } from "./utils"

export default {
  id: "asdf1234",
  components: [
    {
      id: "c1",
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
          c_unit: "g/L"
        }
      ]
    },
    {
      id: "c2",
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
          c_unit: "mM"
        }
      ]
    },
    {
      id: "c3",
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
          c_unit: "g/L"
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
          c_unit: "mM"
        }
      ]
    },
    {
      id: "c4",
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
          c_unit: "mM"
        }
      ]
    },
    {
      id: "c5",
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
          c_unit: "g/L"
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
          c_unit: "mM"
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
          c_unit: "mM"
        }
      ]
    }
  ],
  actions: [
    {
      id: "a1",
      inputs: ["c1", "c2"],
      type: {
        reactive: false,
        method: "Merge"
      },
      output: "c3"
    },
    {
      id: "a2",
      inputs: ["c3", "c4"],
      type: {
        reactive: true,
        method: "Merge",
        detail: "Stir",
        instrument: "Syringe",
        rpm: 100,
        temperature: 27
      },
      output: "c5"
    }
  ]
}
