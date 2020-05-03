export default {
  name: "process_template",
  templates: [
    {
      name: "Mix",
      info: {
        inputs: [],
        gradually: false,
        time: 0,
      },
    },
    {
      name: "Stirring",
      info: {
        chem_for: {
          id: "",
          amount: 0,
        },
        rpm: 0,
        time: 0,
        heating: false,
      },
    },
    {
      name: "Heat",
      info: {
        chem_for: {
          id: "",
        },
        temperature: 0,
        time: 30,
        stirring: false,
      },
    },
    {
      name: "Water bath",
      info: {
        chem_for: {
          id: "",
        },
        temperature: 0,
        time: 0,
        stirring: false,
      },
    },
    {
      name: "Cooling",
      info: {
        chem_for: {
          id: "",
        },
        temperature: 0,
        time: 0,
        feeding_gas: null,
      },
    },
    {
      name: "Filtering",
      info: {
        chem_for: {
          id: "",
        },
        feeding: null,
      },
    },
  ],
}
