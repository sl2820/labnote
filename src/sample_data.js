// data
import { uuid } from "./utils"

export default {
  users: [
    {
      id: "hngskj",
      pw: "hellohello",
      name: "Sukjoo Hong",
      email: "sukjoo.hong@kaist.ac.kr",
      projects: [
        {
          id: uuid(),
          name: "Project 1",
          created: "Feb 2 2020 13:00:00",
          shared: ["hnsgkj@gmail.com"],
          note: {
            flasks: [
              // current state for TUI
              {
                name: "my flask 1",
                id: uuid(),
                reactive: {
                  instrument: "syringe",
                  type: "stir",
                  rpm: 100,
                  temperature: 10,
                  ingredients: ["asdf1234", "qwer5678"]
                },
                chemicals: [
                  {
                    id: "asdf1234",
                    product_number: "S7276",
                    formula: "AgNO3",
                    name: "silver nitrate",
                    molecular_weight: 169.87,
                    state: "solution",
                    volumn: 5,
                    unit: "mL"
                    // more?
                  },
                  {
                    id: "qwer5678",
                    product_number: "PHR1008",
                    formula: "C6H8O6",
                    name: "ascorbic acid",
                    molecular_weight: 176.12,
                    state: "solution",
                    volumn: 250,
                    unit: "uL"
                    // more?
                  }
                ]
              },
              {
                // my flask 2
              }
            ],
            steps: [
              // history for GUI
              {
                id: uuid(),
                created: "Feb 2 2020 13:00:10",
                tasks: []
              },
              {
                id: uuid(),
                created: "Feb 2 2020 13:00:20",
                tasks: []
              },
              {
                id: uuid(),
                created: "Feb 2 2020 13:00:30",
                tasks: []
              }
            ]
          }
        },
        {
          id: uuid(),
          name: "Project 2",
          created: "Feb 3 2020 15:00:00",
          note: {
            // new flasks & steps
          }
        }
      ]
    },
    {
      // new user
    }
  ]
}
