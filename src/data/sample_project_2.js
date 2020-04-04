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
          p_unit: "Pa",
          property: ["after washing"]
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
          p_unit: "Pa",
          property: []
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
            amount: 0
          }
        ],
        gradually: true,
        time: 10
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
          p_unit: "Pa",
          property: []
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
          p_unit: "Pa",
          property: []
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
          product_number: "31630",
          state: "solution",
          solvent: "water",
          volumn: 110,
          v_unit: "uL",
          concentration: 30,
          c_unit: "mM",
          weight: null,
          w_unit: "g",
          pressure: null,
          p_unit: "Pa",
          property: []
        }
      ]
    },
    {
      id: "c5",
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
          p_unit: "Pa",
          property: []
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
          p_unit: "Pa",
          property: []
        },
        {
          id: "c4_1",
          name: "AgNO3",
          product_number: "31630",
          state: "solution",
          solvent: "water",
          volumn: 60,
          v_unit: "uL",
          concentration: 30,
          c_unit: "mM",
          weight: null,
          w_unit: "g",
          pressure: null,
          p_unit: "Pa",
          property: []
        }
      ]
    },
    {
      id: "p3",
      type: "process",
      info: {
        name: "Stirring",
        chem_for: {
          id: "c4",
          amount: 60
        },
        rpm: 10,
        time: 60,
        heating: true
      }
    },
    {
      id: "p4",
      type: "process",
      info: {
        name: "Heat",
        chem_for: {
          id: "c2"
        },
        temperature: 120,
        time: 30,
        stirring: false
      }
    },
    {
      id: "p5",
      type: "process",
      info: {
        name: "Water bath",
        chem_for: {
          id: "c5"
        },
        temperature: 70,
        time: 600,
        stirring: false
      }
    },
    {
      id: "p6",
      type: "process",
      info: {
        name: "Cooling",
        chem_for: {
          id: "c1"
        },
        temperature: -10,
        time: 400,
        feeding_gas: [{ name: "hydrogen" }, { name: "oxygen" }]
      }
    },
    {
      id: "p7",
      type: "process",
      info: {
        name: "Filtering",
        chem_for: {
          id: "c3"
        },
        feeding: [{ name: "paper" }]
      }
    }
  ]
}
