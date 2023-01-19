import { IO } from "./io";

type Status = "prepare" | "progress" | "terminate";

interface Choice {
  id: number;
  name: string;
  voters: number[];
}

interface Id {
  id: number;
}

interface BaseAgenda {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  choices: Choice[];
  voters: number[];
}

interface CreateRequest {
  title: string;
  subtitle: string;
  content: string;
  choices: string[];
  voters: number[];
}

interface CreateResponse extends BaseAgenda {
  status: "prepare";
}

interface RetrieveResponse extends BaseAgenda {
  status: Status;
}

interface UpdateResponse extends BaseAgenda {
  status: "prepare";
}

export type Create = IO<CreateRequest, CreateResponse>;
export type RetrieveAll = IO<{}, RetrieveResponse[]>;
export type Start = IO<Id, Id>;
export type Terminate = IO<Id, Id>;
export type Update = IO<Id, UpdateResponse>;
export type Delete = IO<Id, Id>;
export type Hurry = IO<Id, never>;
