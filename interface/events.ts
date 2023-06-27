import type { Events, Ev } from "./helpers";

import type * as adminAgenda from "./admin/agenda";
import type * as agenda from "./agenda";
import type * as chat from "./chat";
import type * as user from "./user";

export type ClientToServerEvents = Events<{
  chat: {
    send: Ev<chat.Send, chat.SendCb>,
    retrieve: Ev<chat.Retrieve, chat.RetrieveCb>,
  },
  agenda: {
    retrieveAll: Ev<agenda.RetrieveAll, agenda.RetrieveAllCb>,
    vote: Ev<agenda.Vote, agenda.VoteCb>,
  },
  user: {
    enter: Ev<user.Enter, user.EnterCb>,
    leave: Ev<user.Leave, user.LeaveCb>,
  },
  admin: {
    agenda: {
      create: Ev<adminAgenda.Create, adminAgenda.CreateCb>,
      retrieveAll: Ev<adminAgenda.RetrieveAll, adminAgenda.RetrieveAllCb>,
      statusUpdate: Ev<adminAgenda.StatusUpdate, adminAgenda.StatusUpdateCb>,
      update: Ev<adminAgenda.Update, adminAgenda.UpdateCb>,
      delete: Ev<adminAgenda.Delete, adminAgenda.DeleteCb>,
      remind: Ev<adminAgenda.Remind, adminAgenda.RemindCb>,
    },
  }
}>;

export type ServerToClientEvents = Events<{
  chat: {
    received: Ev<chat.Received>,
  },
  agenda: {
    started: Ev<agenda.Started>,
    voted: Ev<agenda.Voted>,
    terminated: Ev<agenda.Terminated>,
    reminded: Ev<agenda.Reminded>,
  },
  user: {
    entered: Ev<user.Entered>,
    left: Ev<user.Left>,
  },
  admin: {
    agenda: {
      created: Ev<adminAgenda.Created>,
      statusUpdated: Ev<adminAgenda.StatusUpdated>,
      updated: Ev<adminAgenda.Updated>,
      deleted: Ev<adminAgenda.Deleted>,
      voted: Ev<adminAgenda.Voted>,
    },
  }
}>;