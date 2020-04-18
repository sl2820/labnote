// import { uuid } from "./utils"

export default {
  id: "123",
  user_id: 20,
  steps: [
    {
      id: "s1",
      name: "seed",
      tasks: [
        {
          id: "s1_c1",
          type: "chemical",
          ingredients: [
            {
              id: "s1_c1_1",
              name: "PSSS",
              product_number: "243051",
              state: "solution",
              solvent: "water",
              volume: 250,
              v_unit: "uL",
              concentration: 0.05,
              c_unit: "g/L",
              weight: null,
              w_unit: "g",
              pressure: null,
              p_unit: "Pa",
              property: [],
            },
          ],
        },
        {
          id: "s1_c2",
          type: "chemical",
          ingredients: [
            {
              id: "s1_c2_1",
              name: "NaBH4",
              product_number: "686018",
              state: "solution",
              solvent: "water",
              volume: 300,
              v_unit: "uL",
              concentration: 10,
              c_unit: "mM",
              weight: null,
              w_unit: "g",
              pressure: null,
              p_unit: "Pa",
              property: [],
            },
          ],
        },
        {
          id: "s1_p1",
          type: "process",
          info: {
            name: "Mix",
            inputs: [
              {
                id: "s1_c1",
                amount: 150,
              },
              {
                id: "s1_c2",
                amount: 0,
              },
            ],
            gradually: true,
            time: 10,
          },
        },
        {
          id: "s1_c3",
          type: "chemical",
          ingredients: [
            {
              id: "s1_c3_1",
              name: "PSSS",
              product_number: "243051",
              state: "solution",
              solvent: "water",
              volume: 150,
              v_unit: "uL",
              concentration: 0.05,
              c_unit: "g/L",
              weight: null,
              w_unit: "g",
              pressure: null,
              p_unit: "Pa",
              property: [],
            },
            {
              id: "s1_c3_2",
              name: "NaBH4",
              product_number: "686018",
              state: "solution",
              solvent: "water",
              volume: 200,
              v_unit: "uL",
              concentration: 10,
              c_unit: "mM",
              weight: null,
              w_unit: "g",
              pressure: null,
              p_unit: "Pa",
              property: [],
            },
          ],
        },
        {
          id: "s1_c4",
          type: "chemical",
          ingredients: [
            {
              id: "s1_c4_1",
              name: "AgNO3",
              product_number: "31630",
              state: "solution",
              solvent: "water",
              volume: 110,
              v_unit: "uL",
              concentration: 30,
              c_unit: "mM",
              weight: null,
              w_unit: "g",
              pressure: null,
              p_unit: "Pa",
              property: [],
            },
          ],
        },
      ],
    },
    {
      id: "s2",
      name: "step 2",
      tasks: [
        {
          id: "s2_p1",
          type: "process",
          info: {
            name: "Heat",
            chem_for: {
              id: "s1_c4",
            },
            temperature: 120,
            time: 30,
            stirring: false,
          },
        },
        {
          id: "s2_c1",
          type: "chemical",
          ingredients: [
            {
              id: "s2_c1_1",
              name: "AgNO3",
              product_number: "31630",
              state: "solution",
              solvent: "water",
              volume: 110,
              v_unit: "uL",
              concentration: 30,
              c_unit: "mM",
              weight: null,
              w_unit: "g",
              pressure: null,
              p_unit: "Pa",
              property: ["after heating"],
            },
          ],
        },
        {
          id: "s2_p2",
          type: "process",
          info: {
            name: "Water bath",
            chem_for: {
              id: "s2_c1",
            },
            temperature: 70,
            time: 600,
            stirring: false,
          },
        },
        {
          id: "s2_c2",
          type: "chemical",
          ingredients: [
            {
              id: "s2_c2_1",
              name: "AgNO3",
              product_number: "31630",
              state: "solution",
              solvent: "water",
              volume: 110,
              v_unit: "uL",
              concentration: 30,
              c_unit: "mM",
              weight: null,
              w_unit: "g",
              pressure: null,
              p_unit: "Pa",
              property: ["after heating on an water bath"],
            },
          ],
        },
        {
          id: "s2_n1",
          type: "note",
          info: {
            title: "hello world",
            description: "Hello, there. This is the description of new note.",
          },
        },
      ],
    },
    {
      id: "s3",
      name: "final",
      tasks: [],
    },
  ],
}
