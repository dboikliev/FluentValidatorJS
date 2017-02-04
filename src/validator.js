class Rule {
    constructor (value) {
        this.rules = [];
        this.messages = [];
    }

    custom({ name, validator }) {
        this.rules.push({ name: name, validator: validator });
        return this;
    }

    defined() {
        this.rules.push({ name: "defined", validator: value => value != undefined });
        return this;
    }

    minLength(min) {
        this.rules.push({ name: "minLength", validator: value => value && value.length >= min });
        return this;
    }

    regex(regularExpression) {
        this.rules.push({ name: "regex", validator: value => value && value.match(/^[\d+]{9}$/)})
    }

    withHandlers(validationHandlers) {
        this.validationHandlers = validationHandlers;
        return this;
    }

    validate(properties) {
        for (let property in properties) {
            for (let { name, validator } of this.rules) {
                if (!validator(properties[property])) {
                    this.validationHandlers[name](property);
                }
            }
        }
    }
}

function rule() {
    return new Rule();
}