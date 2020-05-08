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
            volume: null,
            weight: "15g",
            solvent: null,
            concentration: null,
            pressure: null,
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
            nickname: "",
            product_number: "834ru8hf",
            amount: "",
            state: "compound",
            volume: null,
            weight: null,
            solvent: null,
            concentration: null,
            pressure: null,
            property: ["mixed chemical"],
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
      tasks: [],
    },
  ],
}
