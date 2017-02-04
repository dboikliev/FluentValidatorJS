# FluentValidatorJS
A small library providing fluent syntax for validation object properties.

####Example:
```javascript
let person = {
    firstName: "Ivan",
    middleName: undefined,
    lastName: "Ivanov"

}

var result = rule()
    .defined()
    .minLength(3)
    .custom({ name: "startWithA", validator: value => value && value.startsWith("A")})
    .withHandlers({
        defined: property => console.log(`${ property } is required.`),
        minLength: property => console.log(`${ property } be at least 50 symbols long.`),
        startWithA: property => console.log(`${ property } must start with A.`)
    })
    .validate(person);
```
