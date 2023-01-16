export interface IO<I, O> {
  _input: I;
  _output: O;
}

export type Request<T extends IO<any, any>> = T extends IO<infer I, any>
  ? I
  : never;
export type Response<T extends IO<any, any>> = T extends IO<any, infer O>
  ? O
  : never;
