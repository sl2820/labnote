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
          gradually: false,
          time:0
    },
    {
        name: "Inject",
        chem_for_inject: {
            id: null,
            amount:null
        },
        to: {
            id: null,
            amount:null
        },
        stirring: true,
        gradually: false,
        time:0
    },
    {
        name: "Wait",
        for: "Growth",
        time:0
    },
    {
        name: "Add",
        chem_for_add: {
            id: null,
            amount:null
        },
        to: {
            id: null,
            amount:null
        },
        gradually: false,
        time:0
    },
    {
        name: "Washing",
        chem_for_wash: {
            id:null
        },
        washer: [
            {
                name: null,
                concentration:null
            }
        ],
        times: 1,
        conditions: [
            {
                rpm: null,
                time: 0
            }
        ]
    },
    {
        name: "Incubating",
        chem_for_incubate: {
            id:null
        },
        temperature: null,
        time:0
    },
    {
        name: "Centrifuge",
        chem_for_centrifuge: {
            id:null
        },
        rpm: null,
        time:0
    },
    {
        name: "Stirring",
        chem_for_stir: {
            id:null
        },
        rpm: null,
        time:0
    },
    {
        name: "Dry",
        chem_for_dry: {
            id:null
        },
        temperature: null,
        time: 0,
        vacuum:false
    },
    {
        name: "Disperse",
        chem_for_disperse: {
            id: null,
            amount:null
        },
        disperser: {
            name: null,
            concentration: null,
            amount:null
        },
        gradually: false,
        time:0
    },
    {
        name: "Sonicate",
        chem_for_sonicate: {
            id:null
        },
        temperature: null,
        time:0
    },
    {
        name: "Furnace",
        chem_for_heat: {
            id:null
        },
        temperature: null,
        ramping_rate: null,
        time: 0,
        feeding_gas: [
            { name:null }
        ]
    },
    {
        name: "Cooling",
        chem_for_cool: {
            id:null
        },
        temperature: null,
        time: 0,
        feeding_gas: [
            { name: null }
        ]
    },
    {
        name: "Annealing",
        chem_for_anneal: {
            id:null
        },
        temperature: null,
        time: 0,
        atmosphere: [
            { name:null }
        ]
    },
    {
        name: "Dissolve",
        solute: {
            id: null,
            amount:null
        },
        solvent: {
            name: null,
            concentration: null,
            amount:null
        },
        gradually: false,
        time:0
    },
    {
        name: "Heat",
        chem_for_heat: {
            id:null
        },
        temperature: null,
        time:0
    }
  ]
}
