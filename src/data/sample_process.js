export default {
  name: "process",
  functions: [
    {
      name: "Mix",
      inputs: [
        {
          id: null,
          amount: null
        },
        {
          id: null,
          amount: null
        }
      ],
      stirring: false,
      heating: false,
      gradually: false,
      time: 0,
      output: {
        name: "+"
      }
    },
    {
      name: "Inject",
      chem_for: {
        id: null,
        amount: null
      },
      chem_to: {
        id: null,
        amount: null
      },
      stirring: true,
      heating: false,
      gradually: false,
      time: 0,
      output: {
        name: "+"
      }
    },
    {
      name: "Wait",
      for: "Growth",
      time: 0
    },
    {
      name: "Add",
      chem_for: {
        id: null,
        amount: null
      },
      chem_to: {
        id: null,
        amount: null
      },
      stirring: false,
      heating: false,
      gradually: false,
      time: 0,
      output: {
        name: "+"
      }
    },
    {
      name: "Washing",
      chem_for: {
        id: null
      },
      washer: [
        {
          name: null,
          concentration: null
        }
      ],
      times: 1,
      conditions: [
        {
          rpm: null,
          time: 0
        }
      ],
      output: {
        name: "",
        property: "after washing"
      }
    },
    {
      name: "Incubating",
      chem_for: {
        id: null
      },
      temperature: null,
      time: 0,
      output: {
        name: "",
        property: "after incubating"
      }
    },
    {
      name: "Centrifuge",
      chem_for: {
        id: null
      },
      rpm: null,
      time: 0,
      output: {
        name: "",
        property: "after centrifuge"
      }
    },
    {
      name: "Stirring",
      chem_for: {
        id: null
      },
      rpm: null,
      time: 0,
      heating: false,
      output: {
        name: "",
        property: "after stirring"
      }
    },
    {
      name: "Dry",
      chem_for: {
        id: null
      },
      temperature: null,
      time: 0,
      vacuum: false,
      output: {
        name: "",
        property: "after drying"
      }
    },
    {
      name: "Disperse",
      chem_for: {
        id: null,
        amount: null
      },
      disperser: {
        name: null,
        concentration: null,
        amount: null
      },
      stirring: false,
      heating: false,
      gradually: false,
      time: 0,
      output: {
        name: "in"
      }
    },
    {
      name: "Sonicate",
      chem_for: {
        id: null
      },
      temperature: null,
      time: 0,
      output: {
        name: "",
        property: "after sonicating"
      }
    },
    {
      name: "Furnace",
      chem_for: {
        id: null
      },
      temperature: null,
      ramping_rate: null,
      time: 0,
      feeding_gas: [{ name: null }],
      output: {
        name: "",
        property: "after heating in furnace"
      }
    },
    {
      name: "Cooling",
      chem_for: {
        id: null
      },
      temperature: null,
      time: 0,
      feeding_gas: [{ name: null }],
      output: {
        name: "",
        property: "after cooling"
      }
    },
    {
      name: "Annealing",
      chem_for: {
        id: null
      },
      temperature: null,
      time: 0,
      atmosphere: [{ name: null }],
      output: {
        name: "",
        property: "after annealing"
      }
    },
    {
      name: "Dissolve",
      solute: {
        id: null,
        amount: null
      },
      solvent: {
        name: null,
        concentration: null,
        amount: null
      },
      stirring: false,
      heating: false,
      gradually: false,
      time: 0,
      output: {
        name: "",
        state: "solution"
      }
    },
    {
      name: "Heat",
      chem_for: {
        id: null
      },
      temperature: null,
      time: 0,
      stirring: false,
      output: {
        name: "",
        property: "after heating"
      }
    },
    {
        name: "Water bath",
        chem_for: {
            id: null
        },
        temperature: null,
        time: 0,
        stirring: false,
        output: {
            name: "",
            property: "after heating on an water bath"
        }
    },
      {
          name: "Filtering",
          chem_for: {
              id: null
          },
          feeding: [{ name: null }],
          output: {
              name: "",
              property: "filtered"
          }
      }
  ]
}
