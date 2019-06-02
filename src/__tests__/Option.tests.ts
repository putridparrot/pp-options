import { Option, None, Some } from "../Option";

describe('Option Tests', () => {

    it('toOption with undefined, expect None', () => {

        let o = Option.toOption(undefined);

        expect(o).toBe(None);
    });

    it('toOption with null, expect None', () => {

        let o = Option.toOption(null);

        expect(o).toBe(None);
    });

    it('toOption with value, expect Some', () => {

        let o = Option.toOption("Hello World");

        expect(o).toBeInstanceOf(Some);
    });

    it('toOption with value, expect correct value from Some', () => {

        let o = Option.toOption("Hello World");

        expect(o.value).toBe("Hello World");
    });

    it('isSome when it is None', () => {

        let o = Option.toOption(undefined);

        expect(o.isSome()).toBeFalsy();
    });

    it('isSome when it is Some', () => {

        let o = Option.toOption("Hello World");

        expect(o.isSome()).toBeTruthy();
    });

    it('defaultValue with None, expect default', () => {

        expect(None.defaultValue("Scooby")).toBe("Scooby");
    });

    it('defaultValue with Some, expect value', () => {

        expect(Option.toOption("Scooby").defaultValue("Doo")).toBe("Scooby");
    });

    it('match with Some, expect some action to be called', () => {

        let option = Option.toOption("Scooby");

        let someFn = jest.fn();
        let noneFn = jest.fn();

        option.match(someFn, noneFn);

        expect(someFn).toBeCalledTimes(1);
        expect(noneFn).not.toBeCalled();
    });


    it('match with None, expect none action to be called', () => {

        let option = Option.toOption(undefined);

        let someFn = jest.fn();
        let noneFn = jest.fn();

        option.match(someFn, noneFn);

        expect(noneFn).toBeCalledTimes(1);
        expect(someFn).not.toBeCalled();
    });


    it('match with Some, expect wrapped value returned', () => {

        let option = Option.toOption("Scooby");

        let someFn = (_: string) => "Doo";
        let noneFn = jest.fn();

        let result = option.match(someFn, noneFn);

        expect(result.value).toBe("Doo");
    });

    it('match with None, expect wrapped value returned', () => {

        let option = Option.toOption(null);

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
        let result = Option.toOption("Scooby").map(transformFn);

        expect(result.value).toBe(123);
    });

    it('calling value on None will error', () => {

        const t = () => {
            None.value;
        };

        expect(t).toThrow(Error);
    });

    it('calling value on Some will unwrap value', () => {

        expect(Option.toOption("Hello").value).toBe("Hello");
    });
});