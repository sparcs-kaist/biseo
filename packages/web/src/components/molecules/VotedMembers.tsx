import React, { useCallback } from "react";
import { Box } from "@biseo/web/components/atoms";
import { border, h, w, round, text } from "@biseo/web/styles";

interface Props {
  name: string;
  userList: (string | undefined)[];
}

export const VotedMembers: React.FC<Props> = ({ name, userList }) => {
  const memberString = useCallback(() => {
    if (userList.length === 0) {
      return "-";
    }
    return userList.sort().reduce((prev, curr) => `${prev} ${curr}`);
  }, [userList]);

  return (
    <Box w="fill" h="fill">
      <div css={[w("fill"), h("fill"), border.gray200, round.md]}>
        <Box
          w="fill"
          h="fill"
          dir="row"
          align="flex-start"
          padHorizontal={13}
          padVertical={6}
          gap={6}
        >
          <div css={[w(70), { whiteSpace: "normal", wordWrap: "break-word" }]}>
            <div css={[text.gray500, text.option1]}>{name}</div>
          </div>

          <div css={[w(160), h("hug")]}>
            <div css={[text.option1, text.gray500, { wordSpacing: "10px" }]}>
              {memberString()}
            </div>
          </div>
        </Box>
      </div>
    </Box>
  );
};
