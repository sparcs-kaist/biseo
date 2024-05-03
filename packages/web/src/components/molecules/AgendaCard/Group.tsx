import React, { Children } from "react";
import { type PropsWithChildren } from "react";
import {
  align,
  bg,
  center,
  column,
  gap,
  h,
  justify,
  padding,
  round,
  row,
  text,
  w,
} from "@biseo/web/styles";
import type { AgendaStatus } from "@biseo/interface/agenda";
import { agendaStatusNames } from "@biseo/web/constants/phrases";
import { ToggleSwitch } from "@biseo/web/components/atoms/ToggleSwitch";
import { EmptyAgendaCard } from "./EmptyAgendaCard";

interface Props extends PropsWithChildren {
  agendaStatus: AgendaStatus;
  handleRecentOnly?: () => void;
}

export const Group: React.FC<Props> = ({
  agendaStatus,
  handleRecentOnly = () => {},
  children = null,
}) => (
  <div>
    <div css={[row, align.center, justify.between, padding.horizontal(15)]}>
      <div css={[row, align.center, h(42), gap(8)]}>
        <h2 css={[text.title2, text.black]}>
          {agendaStatusNames[agendaStatus]}
        </h2>
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
          {Children.count(children)}
        </div>
      </div>
      {agendaStatus === "terminated" && (
        <ToggleSwitch label="최근 투표만" handleToggle={handleRecentOnly} />
      )}
    </div>
    {Children.count(children) ? (
      <ul css={[column, gap(15)]}>{children}</ul>
    ) : (
      <EmptyAgendaCard agendaStatus={agendaStatus} />
    )}
  </div>
);
