const n = 1;
// const m: string = n as string
const m: string = n as any as string

let s1 = "JavaScript" as const;
// s1 = "Hello world"
let s2 = "JavaScript"