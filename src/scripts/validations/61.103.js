export default {
    "61.103": {
        title: "Eligibility Requirements: General",
        subsections: [{
            name: 'a',
            target: ['airplane', 'single-engine'],
            validators: [{"Applicant Age": (value) => value >= 17}]
        }, {
            name: 'c',
            validators:[{"Applicant can Read, Speak and Write English": (value) => !!value}]
        }, {
            name: 'd',
            subsections:[{
                name: '1',
                validators:[{"Has CFI Endorsement for Training, or Review of Training of Home Study Course": (value) => !!value}]
            }, {
                name: '2',
                validators:[{"Has CFI Endorsement Certifying Readiness for Required Knowledge Test": (value) => !!value}]
            }]
        }, {
            name: 'e',
            validators:[{"Knowledge Test Passed": (value) => !!value}]
        }, {
            name: 'f',
            subsections:[{
                name: '1',
                validators:[{"Has CFI Endorsement for Training in the areas of Operation that Apply for Rating Sought": (value) => !!value}]
            }, {
                name: '2',
                validators:[{"Has CFI Endorsement Certifying Readiness for Practical Test": (value) => !!value}]
            }]
        }, {
            name: 'j',
            validators:[{"Applicant Holds a U.S. Student Pilot, Sport Pilot, or Recreational Pilot Certificate": (value) => !!value}]
        }]
    }
}