import React, { useCallback } from "react";
import { Box, Text } from "@biseo/web/components/atoms";
import { border, h, w, round } from "@biseo/web/styles";

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
            <Text variant="option1">{name}</Text>
          </div>

          <div css={[w(160), h("hug")]}>
            <Text css={{ wordSpacing: "10px" }} variant="option1">
              {memberString()}
            </Text>
          </div>
        </Box>
      </div>
    </Box>
  );
};
