type Emitable = Record<string, any>;

export type Res<T extends Emitable> =
  | { ok: true, data: T }
  | { ok: false, message: string }
export type Callback<T extends Emitable> = (emit: Res<T>) => void;

export type Ev<
  E extends Emitable,
  Cb extends Emitable | null = null,
> = Cb extends Emitable
  ? (emit: E, callback: Callback<Cb>) => void
  : (emit: E) => void;

type Entry = { key: string, value: any };
type Explode<T> = T extends Ev<any, any>
  ? { key: "", value: T }
  : {
    [K in keyof T]:
    K extends string ? Explode<T[K]> extends infer E ? E extends Entry
      ? {
        key: `${K}${E["key"] extends "" ? "" : "."}${E["key"]}`,
        value: E["value"],
      }
      : never : never : never
  }[keyof T];

type Collapse<T extends Entry> = {
  [E in T as E["key"]]: E["value"]
} extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

type EventMap = { [key: string]: Ev<any, any> | EventMap };
export type Events<T extends EventMap> = Collapse<Explode<T>>;
