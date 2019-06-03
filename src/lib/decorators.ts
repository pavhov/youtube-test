import Debug, { IDebugger } from "debug";


let debug: IDebugger = Debug(`${process.env.NODE_NAME}`);

export function Run(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    target[propertyKey]();

    debug(`Running: ${target.constructor.name}.${propertyKey}()`);
}
