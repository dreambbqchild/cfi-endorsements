export default {
    "61.109": {
        title: "Aeronautical Experience",
        subsections: [{
            name: 'a',
            target: ['airplane', 'single-engine'],
            validators: [
                {"Total Time Logged": (value) => value >= 40},
                {"Dual Time Logged": (value) => value >= 20},
                {"Solo Time Logged": (value) => value >= 10},
            ],
            subsections: [{
                name: "1",
                validators:[{"Dual Day Cross Country Time Logged": (value) => value >= 3}]
            }, {
                name: "2",
                validators:[{"Dual Night Time Logged": (value) => value >= 3}],
                subsections:[{
                    name: "i",
                    validators:[{"Dual Longest Night Cross Country Distance": (value) => value >= 100}],
                }, {
                    name: "ii",
                    validators:[{"Dual Total Night Landings": (value) => value >= 10}]
                }]
            }, {
                name: "3",
                validators:[{"Simulated Instrument Time Logged": (value) => value >= 3}]
            },{
                name: "4",
                validators:[{"Dual Flight Time Logged Within Preceding 2 Calendar Months of the Month of the Test": (value) => value >= 3}]
            }, {
                name: "5",
                subsections:[{
                    name: "i",
                    validators:[{"Total Solo Cross Country Time Logged": (value) => value >= 5}]
                }, {
                    name: "ii",
                    validators:[
                        {"Total Nautical Mile Distance of Longest Solo Cross Country": (value) => value >= 150},
                        {"Full-Stop Airport Landings on Longest Solo Cross Country": (value) => value >= 3},
                        {"Longest Nautical Mile Leg on Longest Solo Cross Country": (value) => value > 50}
                    ]
                }, {
                    name: 'iii',
                    validators:[{"Total Solo Towered Airport Landings": (value) => value >= 3}]
                }]
            }]
        }]
    }
}