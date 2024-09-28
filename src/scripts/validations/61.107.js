export default {
    "61.107": {
        title: "Flight Proficiency",
        subsections: [{
            name: 'a',
            validators:[{"Received Training from an Authorized Instructor": (value) => !!value}]
        }, {
            name: 'b',
            target: ['airplane', 'single-engine'],
            subsections:[{
                name: "i",
                validators:[{"Covered Preflight Preparation": (value) => !!value}]
            },{
                name: "ii",
                validators:[{"Covered Preflight Procedures": (value) => !!value}]
            },{
                name: "iii",
                validators:[{"Covered Airport/Seaplane Base Operations": (value) => !!value}]
            },{
                name: "iv",
                validators:[{"Covered Takeoffs, Landings, and Go-Arounds": (value) => !!value}]
            },{
                name: "v",
                validators:[{"Covered Performance Maneuvers": (value) => !!value}]
            },{
                name: "vi",
                validators:[{"Covered Ground Reference Maneuvers": (value) => !!value}]
            },{
                name: "vii",
                validators:[{"Covered Navigation": (value) => !!value}]
            },{
                name: "viii",
                validators:[{"Covered Slow Flight and Stalls": (value) => !!value}]
            },{
                name: "ix",
                validators:[{"Covered Basic Instrument Maneuvers": (value) => !!value}]
            },{
                name: "x",
                validators:[{"Covered Emergency Operations": (value) => !!value}]
            },{
                name: "xi",
                validators:[{"Covered Applicable Night Operations": (value) => !!value}]
            },{
                name: "xii",
                validators:[{"Covered Postflight Procedures": (value) => !!value}]
            }]
        }]
    }
}