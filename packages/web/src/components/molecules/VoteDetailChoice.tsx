import React, { useCallback } from "react";
import { Box, Text } from "@biseo/web/components/atoms";
import { border, h, w, round } from "@biseo/web/styles";

interface Props {
  name: string;
  userList: (number | null)[];
}

export const VoteDetailChoice: React.FC<Props> = ({ name, userList }) => {
  const getVoters = useCallback(
    () => userList.map(user => <Text variant="option1">{user}</Text>),
    [userList],
  );

  return (
    <Box w="fill" h={30}>
      <div css={[w("fill"), h("fill"), border.gray200, round.md]}>
        <Box
          w="fill"
          h="fill"
          dir="row"
          align="center"
          justify="space-between"
          padHorizontal={13}
          padVertical={6}
        >
          <Text variant="option1">{name}</Text>
          {getVoters()}
        </Box>
      </div>
    </Box>
  );
};
