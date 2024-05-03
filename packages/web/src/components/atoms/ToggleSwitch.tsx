import { bg, colors, h, margin, round, row, text, w } from "@biseo/web/styles";
import React from "react";

interface ToggleSwitchProps {
  handleToggle: () => void;
  label: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  handleToggle,
  label,
}) => (
  <div>
    <input
      type="checkbox"
      id="toggle"
      onChange={handleToggle}
      css={[
        w(0),
        h(0),
        `display: none;
        :checked + label div { background-color: ${colors.blue500}; }
        :checked + label div span { transform: translateX(10px) }`,
      ]}
    />
    <label htmlFor="toggle" css={[row]}>
      <div
        css={[
          bg.gray300,
          w(28),
          h(18),
          round.xl,
          `position: relative`,
          `transition: 0.2s`,
        ]}
      >
        <span
          css={[
            w(12),
            h(12),
            round.xl,
            bg.white,
            margin(3),
            `position: absolute`,
            `transition: all 0.2s`,
          ]}
        />
      </div>
      <span css={[text.subtitle, text.gray600, margin.left(4)]}>{label}</span>
    </label>
  </div>
);
