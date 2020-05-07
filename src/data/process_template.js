export default {
  name: "process_template",
  templates: [
    {
      name: "Mix",
      info: {
        name: "Mix",
        inputs: [],
        gradually: false,
        time: 0,
      },
    },
    {
      name: "Add",
      info: {
        name: "Add",
        chem_for: {
          id: null,
          amount: null,
        },
        chem_to: {
          id: null,
          amount: null,
        },
        stirring: false,
        heating: false,
        gradually: false,
        time: 0,
      },
    },
    {
      name: "Inject",
      info: {
        name: "Inject",
        chem_for: {
          id: null,
          amount: null,
        },
        chem_to: {
          id: null,
          amount: null,
        },
        stirring: false,
        heating: false,
        gradually: false,
        time: 0,
      },
    },
    {
      name: "Stirring",
      info: {
        name: "Stirring",
        chem_for: {
          id: "",
        },
        rpm: 0,
        time: 0,
        heating: false,
      },
    },
    {
      name: "Heat",
      info: {
        name: "Heat",
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
        name: "Water bath",
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
        name: "Cooling",
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
        name: "Filtering",
        chem_for: {
          id: "",
        },
        feeding: null,
      },
    },
  ],
}
