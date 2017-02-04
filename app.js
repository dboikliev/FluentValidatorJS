require(["src/validator"], function() {
    let person = {
        firstName: "Ivan",
        middleName: undefined,
        lastName: "Ivanov"

    }

    register({ name: "startWithA", validator: value => value && value.startsWith("A")});

    var result = rule()
        .defined()
        .minLength(3)
        .startWithA()
        .withHandlers({
            defined: property => console.log(`${ property } is required.`),
            minLength: property => console.log(`${ property } be at least 50 symbols long.`),
            startWithA: property => console.log(`${ property } must start with A.`)
        })
        .validate(person);
})