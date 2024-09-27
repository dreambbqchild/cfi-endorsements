export default {
    "61.109": {
        title: "Aeronautical Experience",
        subsections: [{
            name: 'a',
            target: 'For an airplane single-engine rating',
            validators: [
                {"Total Time Logged": (total) => total >= 40},
                {"Dual Time Logged": (dual) => dual >= 20},
                {"Solo Time Logged": (solo) => solo >= 10},
            ],
            subsections: [{
                name: "1",
                validators:[{
                    "Dual Day Cross Country Time Logged": (xc) => xc >= 3,
                }]
            }, {
                name: "2",
                validators:[{
                    "Dual Night Time Logged": (xc) => xc >= 3,
                }],
                subsections:[{
                    name: "i",
                    validators:[{
                        "Dual Longest Night Cross Country Distance": (dist) => dist >= 100
                    }],
                }, {
                    name: "ii",
                    validators:[{
                        "Dual Total Night Landings": (landings) => landings >= 10
                    }]
                }]
            }, {
                name: "3",
                validators:[{
                    "Simulated Instrument Time Logged": (simInstrument) => simInstrument >= 3
                }]
            },{
                name: "4",
                validators:[{
                    "Dual Flight Time Logged Within Preceding 2 Calendar Months of the Month of the Test": (dual) => dual >= 3
                }]
            }, {
                name: "5",
                subsections:[{
                    name: "i",
                    validators:[{
                        "Total Solo Cross Country Time Logged": (soloXc) => soloXc >= 5
                    }]
                }, {
                    name: "ii",
                    validators:[
                        {"Total Nautical Mile Distance of Longest Solo Cross Country": (distance) => distance >= 150},
                        {"Full-Stop Airport Landings on Longest Solo Cross Country": (landings) => landings >= 3},
                        {"Longest Nautical Mile Leg on Longest Solo Cross Country": (longestLeg) => longestLeg > 50}
                    ]
                }, {
                    name: 'iii',
                    validators:[{
                        "Total Solo Towered Airport Landings": (landings) => landings >= 3
                    }]
                }]
            }]
        }]
    }
}