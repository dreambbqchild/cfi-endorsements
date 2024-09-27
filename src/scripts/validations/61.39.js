export default {
    "61.39": {
        title: "Prerequisites for Practical Tests",
        subsections: [{
            name: 'a',
            subsections: [{
                name: "1",
                subsections: [{
                    name: 'i',
                    validators: [{
                        "Passed Knowledge Test Within Preceding 24 Calendar Months of the Month of the Test": (value) => value == true
                    }]
                }]
            }, {
                name: "2",
                validators:[{
                    "Has Knowledge Test Report to Present to DPE": (value) => value == true
                }]
            }, {
                name: "3",
                validators:[{
                    "Satisfactorily Accomplished Required training and Obtained the Aeronautical Experience": (value) => value == true
                }]
            }, {
                name: "4",
                validators:[{
                    "If Medical is Required Holds at Least a 3rd Class": (value) => value == true
                }]
            }, {
                name: "5",
                validators:[{
                    "Applicant is 16 Years Old if Seeking Rating in Glider or Balloon, else is 17": (value) => value == true
                }]
            }, {
                name: "6",
                subsections: [{
                        name: 'i',
                        validators: [{"Logged Training Time Within Preceding 2 Calendar Months of the Month of the Test": (value) => value == true}]
                    }, {
                        name: 'ii',
                        validators: [{"Is prepared for practical test": (value) => value == true}]
                    }, {
                        name: 'iii',
                        validators: [{"Addressed Deficiencies on Knowledge Test Report": (value) => value == true}]
                    }]
            }, {
                name: "7",
                validators:[{"Has a Completed and Signed Application Form": (value) => value == true}]
            }]
        }]
    }
}