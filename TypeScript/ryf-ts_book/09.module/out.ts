export interface A {
    a: string
}
export let a = 123;

export type Bool = false | true;
type C = "c";
type B = "b";
export { type C, type B }

let obj = {
    a: "123"
}
export = obj;