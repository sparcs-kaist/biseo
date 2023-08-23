import type { Events, Ev } from "./helpers";

import type * as init from "./init";
import type * as adminAgenda from "./admin/agenda";
import type * as adminUser from "./admin/user";
import type * as agenda from "./agenda";
import type * as agendaTemplate from "./agenda/template";
import type * as chat from "./chat";
import type * as user from "./user";
import type * as userTag from "./user/tag";

export type ClientToServerEvents = Events<{
  chat: {
    send: Ev<chat.Send, chat.SendCb>;
    retrieve: Ev<chat.Retrieve, chat.RetrieveCb>;
  };
  agenda: {
    retrieveAll: Ev<agenda.RetrieveAll, agenda.RetrieveAllCb>;
    vote: Ev<agenda.Vote, agenda.VoteCb>;
    template: {
      create: Ev<agendaTemplate.Create, agendaTemplate.CreateCb>;
      retrieveAll: Ev<agendaTemplate.RetrieveAll, agendaTemplate.RetrieveAllCb>;
      update: Ev<agendaTemplate.Update, agendaTemplate.UpdateCb>;
      delete: Ev<agendaTemplate.Delete, agendaTemplate.DeleteCb>;
    };
  };
  user: {
    enter: Ev<user.Enter, user.EnterCb>;
    leave: Ev<user.Leave, user.LeaveCb>;
    tag: {
      create: Ev<userTag.Create, userTag.CreateCb>;
      retrieveAll: Ev<userTag.RetrieveAll, userTag.RetrieveAllCb>;
      update: Ev<userTag.Update, userTag.UpdateCb>;
      delete: Ev<userTag.Delete, userTag.DeleteCb>;
    };
  };
  admin: {
    agenda: {
      create: Ev<adminAgenda.Create, adminAgenda.CreateCb>;
      retrieveAll: Ev<adminAgenda.RetrieveAll, adminAgenda.RetrieveAllCb>;
      statusUpdate: Ev<adminAgenda.StatusUpdate, adminAgenda.StatusUpdateCb>;
      update: Ev<adminAgenda.Update, adminAgenda.UpdateCb>;
      delete: Ev<adminAgenda.Delete, adminAgenda.DeleteCb>;
      remind: Ev<adminAgenda.Remind, adminAgenda.RemindCb>;
    };
    user: {
      retrieveAll: Ev<adminUser.RetrieveAll, adminUser.RetrieveAllCb>;
    };
  };
}>;

export type ServerToClientEvents = Events<{
  init: Ev<init.Init>;
  chat: {
    received: Ev<chat.Received>;
  };
  agenda: {
    created: Ev<agenda.Created>;
    updated: Ev<agenda.Updated>;
    started: Ev<agenda.Started>;
    voted: Ev<agenda.Voted>;
    terminated: Ev<agenda.Terminated>;
    deleted: Ev<agenda.Deleted>;
    reminded: Ev<agenda.Reminded>;
    tag: {
      created: Ev<agendaTemplate.Created>;
      updated: Ev<agendaTemplate.Updated>;
      deleted: Ev<agendaTemplate.Deleted>;
    };
  };
  user: {
    entered: Ev<user.Entered>;
    left: Ev<user.Left>;
    tag: {
      created: Ev<userTag.Created>;
      updated: Ev<userTag.Updated>;
      deleted: Ev<userTag.Deleted>;
    };
  };
  admin: {
    agenda: {
      created: Ev<adminAgenda.Created>;
      statusUpdated: Ev<adminAgenda.StatusUpdated>;
      updated: Ev<adminAgenda.Updated>;
      deleted: Ev<adminAgenda.Deleted>;
      voted: Ev<adminAgenda.Voted>;
    };
  };
}>;
