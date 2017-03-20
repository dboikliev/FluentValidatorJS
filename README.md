# FluentValidatorJS
A small library providing fluent syntax for validation of object properties.

### Example:

#### 1. Validation:

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

#### Result:

```
firstName must start with A.
middleName is required.
middleName be at least 50 symbols long.
middleName must start with A.
lastName must start with A.
```

#### 2. Custom rule registration:
```javascript
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
```

#### Result: 
The same result as the first example but now the startsWithA rule can be reused.

```
firstName must start with A.
middleName is required.
middleName be at least 50 symbols long.
middleName must start with A.
lastName must start with A.
```
