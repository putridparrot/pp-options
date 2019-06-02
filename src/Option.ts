/**
 * Option base type. An Option can be a None or Some
 */
export abstract class Option<T> {    

    public abstract get value(): T;

    /**
     * Takes a value of any type and creates an Option
     * from it, undefined/null becomes a None whilst
     * other values are wrapped as Some
     * @param v 
     */
    public static toOption<T>(v: any): Option<T> {
        return !Option.hasValue(v) ?
            None :  
            new Some<T>(v);
    }

    /**
     * Gets whether a value exists, i.e. it's
     * neither undefined or null
     * @param value 
     */
    public static hasValue(value: any): boolean {
        return value !== undefined && value !== null;
    }

    /**
     * Gets whether the value is a Some
     */
    public isSome(): boolean {
        return this instanceof Some;
    }

    /**
     * Gets whether the Option is a None
     */
    public isNone(): boolean {
        return this instanceof NoneOption;
    }

    /**
     * Gets the value (if not undefined/null or None) else
     * returns the defaultValue. This unwraps an Option
     * @param defaultValue 
     */
    public defaultValue<T>(defValue: any): T {
        if (this.isSome()) {
            let s = this as unknown as Some<T>;
            return s.value;
        }
        else if (this.isNone()) {
            return defValue;
        }
        return defValue;
    }

    /**
     * Match acts like pattern matching (or swtich) and will 
     * invoke either the Some or None functions based upon 
     * the option argument
     * @param someValue 
     * @param noneValue 
     */
    public match<T, TResult>(
        someValue: (value: T) => TResult, 
        noneValue: () => TResult): Option<T> {

        if(this.isSome()) {
            let s = this as unknown as Some<T>;
            if(Option.hasValue(someValue)) {
                return Option.toOption(someValue(s.value));
            }
        }
        else {
            if(Option.hasValue(noneValue)) {
                return Option.toOption(noneValue());
            }
        }

        return None;
    }

    /**
     * Transforms an Option using the supplied transformFunc. If the Option
     * is None, None is return otherwise the return from the transformFunc
     * is wrapped in an Option and returned.
     * @param transformFunc 
     */
    public map<T, TResult>(transformFunc: (value: T) => TResult): Option<T> {

        if(!Option.hasValue(transformFunc) || this.isNone()) {
            return None;
        }

        let s = this as unknown as Some<T>;
        return Option.toOption(transformFunc(s.value));
    }
}

/**
 * A None Option type
 */
class NoneOption extends Option<any> {    
    public get value(): any {
        throw new Error("Value not supported in None")
    }
}

/**
 * A Some object has a non-null/non-undefined value
 */
export class Some<T> extends Option<T> {
    public constructor(private val: T) {        
        super();
    }

    public get value(): T {
        return this.val;
    }    
}

/**
 * A module/singleton for a None value
 */
export let None = new NoneOption();
