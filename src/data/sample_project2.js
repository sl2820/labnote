// import { uuid } from "./utils"

export default {
  id: "123",
  user_id: 20,
  name: "Test examples for new structure",
  columns: [
    {
      id: "s1",
      name: "simple mix example",
      tasks: [
        {
          id: "s1_c1",
          type: "chemical",
          additional: "This is my memo.",
          info: {
            display: "AgNO3",
            nickname: null,
            product_number: "7d8yav",
            amount: null,
            state: "solution",
            volume: "250uL",
            weight: null,
            solvent: "water",
            concentration: "15mM",
            pressure: null,
            v_unit: null,
            w_unit: null,
            c_unit: null,
            p_unit: null,
            property: [],
            sources: [],
          },
        },
        {
          id: "s1_c2",
          type: "chemical",
          additional: "This is my memo22222222.",
          info: {
            display: "NaBH4",
            nickname: "hello",
            product_number: "3qgrq34g",
            amount: null,
            state: "liquid",
            volume: "32g",
            weight: null,
            solvent: null,
            concentration: null,
            pressure: null,
            v_unit: null,
            w_unit: null,
            c_unit: null,
            p_unit: null,
            property: ["after heating", "on an water bath"],
            sources: [],
          },
        },
        {
          id: "s1_p1",
          type: "process",
          additional: "processsssss mix 1!",
          info: {
            name: "Mix",
            inputs: [
              {
                id: "s1_c1",
                amount: "100uL",
              },
              {
                id: "s1_c2",
                amount: "all",
              },
            ],
            gradually: true,
            time: 10,
          },
        },
        {
          id: "s1_c3",
          type: "chemical",
          additional: "the output of process mix",
          info: {
            display: "AgNO3 + hello",
            nickname: null,
            product_number: null,
            amount: "",
            state: "compound",
            volume: null,
            weight: null,
            solvent: null,
            concentration: null,
            pressure: null,
            v_unit: null,
            w_unit: null,
            c_unit: null,
            p_unit: null,
            property: ["mixed"],
            sources: [
              {
                id: "s1_c1",
                amount: "100uL",
              },
              {
                id: "s1_c2",
                amount: "all",
              },
            ],
          },
        },
      ],
    },
    {
      id: "s2",
      name: "example 2",
      tasks: [
        {
          id: "s3_p1",
          type: "process",
          additional: "",
          info: {
            name: "Heat",
            chem_for: {
              id: null,
            },
            temperature: 0,
            time: 0,
            stirring: false,
          },
        },
        {
          id: "s3_p2",
          type: "process",
          additional: "process add",
          info: {
            name: "Add",
            chem_for: {
              id: "s1_c1",
              amount: "123g",
            },
            chem_to: {
              id: "s1_c2",
              amount: "1L",
            },
            stirring: false,
            heating: true,
            gradually: true,
            time: 1234,
          },
        },
        {
          id: "s3_p3",
          type: "process",
          additional: "process inject~",
          info: {
            name: "Inject",
            chem_for: {
              id: "s1_c1",
              amount: "100",
            },
            chem_to: {
              id: "s2_c1",
              amount: "200",
            },
            stirring: true,
            heating: false,
            gradually: true,
            time: 987,
          },
        },
        {
          id: "s3_p4",
          type: "process",
          additional: "",
          info: {
            name: "Cooling",
            chem_for: {
              id: "s1_c3",
            },
            temperature: 0,
            time: 0,
            stirring: false,
          },
        },
      ],
    },
  ],
}
