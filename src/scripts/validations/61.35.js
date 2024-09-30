export default {
    "61.35": {
        title: "Knowledge Test: Prerequisites & Passing Grades",
        subsections: [{
            name: 'a',
            subsections:[{
                name: '1',
                validators: [{"Endorsement Certifing Applicant Studied & is Ready": (value) => !!value}]
            }, {
                name: '3',
                subsections: [{
                    name: 'i',
                    validators: [{"ID: Photograph": (value) => !!value}]
                }, {
                    name: 'ii',
                    validators: [{"ID: Signature": (value) => !!value}]
                }, {
                    name: 'iii',
                    subsections: [{
                        name: 'A',
                        validators:[{"ID: Proof Applicant Will Be of Age to Earn Certificate Sought Before Knowledge Test Expires": (value) => !!value}]
                    }],
                }, {
                    name: 'iv',
                    validators:[{"Applicant can Provide a Current Residential Address": (value) => !!value}]
                }]
            }]
        }]
    }
}