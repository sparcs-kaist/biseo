export type CallbackResponse<T extends Record<string, any>> = {
  ok: true;
  data: T;
} | {
  ok: false;
  message: string;
}

export type ClientEvent<I extends Record<string, any>, O extends Record<string, any>>
  = (input: I, callback: (output: CallbackResponse<O>) => void) => void;

export type ServerEvent<O extends Record<string, any>>
  = (output: O) => void;

export type Prefix<P extends string, E extends Record<string, any>> =
  { [K in keyof E as K extends string ? `${P}/${K}` : never]: E[K] };
