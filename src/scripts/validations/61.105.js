export default {
    "61.105": {
        title: "Aeronautical Knowledge",
        subsections: [{
            name: 'a',
            validators:[{"Ground Training Completed": (value) => !!value}]
        }, {
            name: 'b',
            subsections:[{
                name: '1',
                validators:[{"Knowledge of FARs for Private Pilot Privileges, Limitations, & Flight Operations": (value) => !!value}]
            }, {
                name: '2',
                validators:[{"Accident Reporting Requirements for NTSB": (value) => !!value}]
            }, {
                name: '3',
                validators:[{"Use of AIM and FAA Advisory Circulars": (value) => !!value}]
            }, {
                name: '4',
                validators:[{"Use of Aeronautical Charts, Pilotage, Dead Reckoning, and Navigation Systems": (value) => !!value}]
            }, {
                name: '5',
                validators:[{"Radio Communication": (value) => !!value}]
            }, {
                name: '6',
                validators:[{"Recognition of Critical Weather Situations": (value) => !!value}]
            }, {
                name: '7',
                validators:[{"Safe and Efficient Operation of Aircraft (Collision Avoidance, Wake Turbulence)": (value) => !!value}]
            }, {
                name: '8',
                validators:[{"Effects of Density Altitude on Performance": (value) => !!value}]
            }, {
                name: '9',
                validators:[{"Weight and Balance Computations": (value) => !!value}]
            }, {
                name: '10',
                validators:[{"Principles of Aerodynamics, Powerplants, and Aircraft Systems": (value) => !!value}]
            }, {
                name: '11',
                validators:[{"Stall Awareness, Spins, and Spin Recovery Rechniques": (value) => !!value}]
            }, {
                name: '12',
                validators:[{"ADM": (value) => !!value}]
            }, {
                name: '13',
                subsections:[{
                    name: 'i',
                    validators:[{"Preflight: Airport Details, Weather Reports & Forecasts, Fuel Requirements": (value) => !!value}]
                }, {
                    name: 'ii',
                    validators:[{"Preflight: Alternates": (value) => !!value}]
                }]
            }]
        }]
    }
}