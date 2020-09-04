# pp-options

![Build](https://github.com/putridparrot/pp-options/workflows/Build/badge.svg)

TypeScript/JavaScript functional style Option type(s). 

Instead of worrying about possible usage of _undefined_ or _null_ values. The Option type acts as a replacement for invalid (undefined or null) values. The subclass None represents undefined/null values whilst the Some class acts as a wrapper around valid values. 

Whilst the Option gives us a warm fuzzy feeling around our undefined or null values we still need to _unwrap_ our values from the Option at times, hence methods such as _defaultValue_ amongst others will handle the test as to whether the Option is a Some or None and return values or pass values to functions by handling this test for us.

_Note: The design of Option began as a port of Optional in Java, then went through C# idioms before arriving in TypeScript and being rewritten to be more inline with the F# implementation of Option._

# Option methods

## of

The _of_ static method allows us to wrap a value within a Some or return a None (if undefined or null).

For example

```javascript

let option = Option.of(someValue);
```

## isSome

As we will normally pass around Option objects, we may need to test of the Option is Some, this method simply returns true if the Option is Some otherwise false.

For example

```javascript
let option = Option.of(someValue);

if(option.isSome()) {
    // do something
}
```

## isNone

As per the _isSome_ method we can test whether an Option is, in this case, None - in which case true is returned otherwise false is returned.

For example

```javascript
let option = Option.of(someValue);

if(option.isNone()) {
    // do something
}
```

## defaultValue

Gets the value if the option is Some, otherwise returns the supplied default value. The resultant value is unwrapped

```javascript
let option = Option.of(someValue);

let value = option.defaultValue(123);
```

## match

The _match_ method acts like pattern matching or a switch statement in that it takes an option/value
input and if it's Some will invoke the supplied someFunction and if None will invoke the supplied noneFunction. 

The someFunction should take the value passed from the Some Option and return an unwrapped value, likewise the noneFunction takes no argument but returns an unwrapped value.

The unwrapped value returned from the functions is then wrapped in an Option.

```javascript

let option = Option.of(someValue);

let someFunction = (_: string) => "SomeValue";
let noneFunction = () => "NoneValue";

let result = option.match(someFunction, noneFunction);
```

## map

The _map_ method takes a transformation function which, if the Option is Some will pass the value to the transformation function, the result of which is then wrapped in an Option. If the Option is None or the transformation function is not defined, then None is returned.

```javascript

let option = Option.of(someValue);

let transformationFunction = (_: string) => 123;

let result = option.map(transformationFunction);
```

## value property

The _Value_ property allows us to unwrap the value stored within a Some object. However originally this was coded to only exist on a Some object, leading to code such as the following being written

```javascript
let option = Option.of("Hello);

let value = (option as Some<string>).value;
```

Instead we now have the _value_ on both None and Some so we can use value like this

```javascript
let option = Option.of("Hello);

let value = option.value;
```

If we have no idea what the option was (i.e. a None or Some) we would normally check using _option.isSome()_ before unwrapping the value or better still use the _defaultValue_ method.

As the value property now exists on both a None and a Some, it obviously make no sense being used on a None and hence if you attempt to unwrap a None an Error will be raised as per the way F# works. 

```javascript
let value = None.value;
```
