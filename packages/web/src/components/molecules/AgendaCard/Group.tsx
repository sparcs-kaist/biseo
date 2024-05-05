import React, { Children } from "react";
import { type PropsWithChildren } from "react";
import {
  align,
  bg,
  center,
  column,
  gap,
  h,
  padding,
  round,
  row,
  text,
  w,
} from "@biseo/web/styles";
import type { AgendaStatus } from "@biseo/interface/agenda";
import { agendaStatusNames } from "@biseo/web/constants/phrases";
import { EmptyAgendaCard } from "./EmptyAgendaCard";

interface Props extends PropsWithChildren {
  agendaStatus: AgendaStatus;
  admin?: boolean;
}

export const Group: React.FC<Props> = ({
  agendaStatus,
  admin = false,
  children = null,
}) => (
  <div>
    <div css={[row, align.center, h(42), gap(8), padding.horizontal(15)]}>
      <h2 css={[text.title2, text.black]}>{agendaStatusNames[agendaStatus]}</h2>
      <div
        css={[
          text.body,
          text.blue600,
          bg.blue200,
          w(20),
          h(20),
          round.md,
          center,
        ]}
      >
        {admin && agendaStatus === "preparing"
          ? // account for the add agenda button
            Children.count(children) - 1
          : Children.count(children)}
      </div>
    </div>
    {Children.count(children) === 0 ||
    (admin &&
      agendaStatus === "preparing" &&
      Children.count(children) === 1) ? (
      // no agendas; show empty card
      <ul css={[column, gap(15)]}>
        {children}
        <EmptyAgendaCard agendaStatus={agendaStatus} />
      </ul>
    ) : (
      <ul css={[column, gap(15)]}>{children}</ul>
    )}
  </div>
);
