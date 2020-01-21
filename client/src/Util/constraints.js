const constraints = {
    firstName: {
        presence: {
            allowEmpty: false
        },
        type: 'string'
    },
    lastName: {
        presence: {
            allowEmpty: false
        },
        type: 'string'
    },
    emailAddress: {
        email: {
            message: '^Email address is invalid'
        },
        presence: {
            allowEmpty: false
        },
        type: 'string'
    },
    githubUrl: {
        url: {
            allowLocal: false
        }
    },
    linkedinUrl: {
        url: {
            allowLocal: false
        }
    },
    password: {   
        presence: {
            allowEmpty: false
        }
    }

}

export default constraints;