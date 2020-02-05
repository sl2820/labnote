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
          note: "asdf1234"
        },
        {
          id: uuid(),
          name: "Project 2",
          created: "Feb 3 2020 15:00:00",
          shared: [],
          note: "qwer5678"
        }
      ]
    },
    {
      // new user
    }
  ]
}
