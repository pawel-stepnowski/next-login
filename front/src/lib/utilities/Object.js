/**
 * Overrides selected methods.
 * 
 * @example
 * const o = new SomeClass(); // object with methods m1() ... m9()
 * const override_config = { m1: true, m2: false, m5: true }
 * const new_method = () => { console.log() }
 * overrideMethods(o, override_config, new_method)
 * 
 * @template {Object} T
 * @param {T} instance 
 * @param {Partial<Record<keyof T, boolean>>} methods 
 * @param {() => Promise<any>} method 
 * @returns {T}
 */
export function overrideMethods(instance, methods, method)
{
    return new Proxy(instance,
    {
        get: (target, property) => 
        {
            // @ts-ignore
            const configuration_value = (methods)[property];
            const intercept = configuration_value === true;
            if (intercept) return method;
            // @ts-ignore
            const value = (instance)[property];
            return typeof value === 'function' ? value.bind(target) : value;
        },
    });
}