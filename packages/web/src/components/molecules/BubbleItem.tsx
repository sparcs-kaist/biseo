import React, { useState, type PropsWithChildren } from "react";
import { center, h, w } from "@biseo/web/styles";
import {
  Bubble,
  type Props as BubbleProps,
} from "@biseo/web/components/atoms/Bubble";

interface Props extends BubbleProps, PropsWithChildren {}

export const BubbleItem: React.FC<Props> = ({
  label,
  position,
  children = null,
}) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      css={[center, w("hug"), h("hug"), "position: relative"]}
      onPointerEnter={() => {
        setHover(true);
      }}
      onPointerLeave={() => {
        setHover(false);
      }}
    >
      {hover && <Bubble label={label} position={position} />}
      {children}
    </div>
  );
};
