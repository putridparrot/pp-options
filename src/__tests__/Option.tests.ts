import { Option, None, Some } from "../Option";

describe('Option Tests', () => {

    it('of with undefined, expect None', () => {

        let o = Option.of(undefined);

        expect(o).toBe(None);
    });

    it('of with null, expect None', () => {

        let o = Option.of(null);

        expect(o).toBe(None);
    });

    it('of with value, expect Some', () => {

        let o = Option.of("Hello World");

        expect(o).toBeInstanceOf(Some);
    });

    it('of with value, expect correct value from Some', () => {

        let o = Option.of("Hello World");

        expect(o.value).toBe("Hello World");
    });

    it('isSome when it is None', () => {

        let o = Option.of(undefined);

        expect(o.isSome()).toBeFalsy();
    });

    it('isSome when it is Some', () => {

        let o = Option.of("Hello World");

        expect(o.isSome()).toBeTruthy();
    });

    it('defaultValue with None, expect default', () => {

        expect(None.defaultValue("Scooby")).toBe("Scooby");
    });

    it('defaultValue with Some, expect value', () => {

        expect(Option.of("Scooby").defaultValue("Doo")).toBe("Scooby");
    });

    it('match with Some, expect some action to be called', () => {

        let option = Option.of("Scooby");

        let someFn = jest.fn();
        let noneFn = jest.fn();

        option.match(someFn, noneFn);

        expect(someFn).toBeCalledTimes(1);
        expect(noneFn).not.toBeCalled();
    });


    it('match with None, expect none action to be called', () => {

        let option = Option.of(undefined);

        let someFn = jest.fn();
        let noneFn = jest.fn();

        option.match(someFn, noneFn);

        expect(noneFn).toBeCalledTimes(1);
        expect(someFn).not.toBeCalled();
    });


    it('match with Some, expect wrapped value returned', () => {

        let option = Option.of("Scooby");

        let someFn = (_: string) => "Doo";
        let noneFn = jest.fn();

        let result = option.match(someFn, noneFn);

        expect(result.value).toBe("Doo");
    });

    it('match with None, expect wrapped value returned', () => {

        let option = Option.of(null);

        let someFn = jest.fn();
        let noneFn = () => "Doo";

        let result = option.match(someFn, noneFn);

        expect(result.value).toBe("Doo");
    });

    it('map with None, expect None', () => {
        let transformFn = (_: string) => 123;

        expect(None.map(transformFn)).toBe(None);
    });

    it('map with Some, expect Some', () => {

        let transformFn = (_: string) => 123;
        let result = Option.of("Scooby").map(transformFn);

        expect(result.value).toBe(123);
    });

    it('calling value on None will error', () => {

        const t = () => {
            None.value;
        };

        expect(t).toThrow(Error);
    });

    it('calling value on Some will unwrap value', () => {

        expect(Option.of("Hello").value).toBe("Hello");
    });
});