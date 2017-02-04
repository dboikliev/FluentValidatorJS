class Rule {
    constructor (value) {
        this.rules = [];
        this.messages = [];
    }

    custom({ name, validator }) {
        this.addRule({ name: name, validator: validator });
        return this;
    }

    defined() {
        this.addRule({ name: "defined", validator: value => value != undefined });
        return this;
    }

    minLength(min) {
        this.addRule({ name: "minLength", validator: value => value && value.length >= min });
        return this;
    }

    regex(regularExpression) {
        this.addRule({ name: "regex", validator: value => value && value.match(/^[\d+]{9}$/)})
        return this;
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

    addRule({ name, validator }) {
        this.rules.push({ name: name, validator: validator });
    }

    static register({ name, validator }) {
        Rule.prototype[name] = function () {
            this.addRule({ name: name, validator: value => validator(value) })
            return this;
        };
    }
}

function rule() {
    return new Rule();
}

function register({ name, validator }) {
    Rule.register({ name: "startWithA", validator: value => value && value.startsWith("A")})
}