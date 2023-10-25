import React, { type PropsWithChildren } from "react";
import { BorderedBox, Box, Scroll, Text } from "@biseo/web/components/atoms";

interface BoxWithTitleProps extends PropsWithChildren {
  title: string;
}
interface BoxWithCountProps extends PropsWithChildren {
  count: number | undefined;
}
interface SubComponents {
  BoxWithTitle: typeof BoxWithTitle;
  TextBoxWithTitle: typeof TextBoxWithTitle;
  OptionResultsBox: typeof OptionResultsBox;
}

const BoxWithTitle: React.FC<BoxWithTitleProps> = ({
  title,
  children = null,
}) => (
  <Box w={300} dir="column" gap={8}>
    <Text variant="body" color="black">
      {title}
    </Text>
    <BorderedBox
      borderColor="gray200"
      bg="white"
      w={300}
      borderSize={1}
      padVertical={10}
      padHorizontal={15}
      round={5}
      borderStyle="solid"
    >
      {children}
    </BorderedBox>
  </Box>
);
// ModalInner.TextBox = TextBox;

const TextBoxWithTitle: React.FC<BoxWithTitleProps> = ({
  title,
  children = null,
}) => (
  <Box w={300} dir="column" gap={10}>
    <Text variant="body" color="black">
      {title}
    </Text>
    <BorderedBox
      borderColor="gray200"
      bg="white"
      w={300}
      borderSize={1}
      padVertical={10}
      padHorizontal={15}
      round={5}
      borderStyle="solid"
    >
      <Text color="gray600" variant="subtitle">
        {children}
      </Text>
    </BorderedBox>
  </Box>
);

const OptionResultsBox: React.FC<BoxWithCountProps> = ({
  children = null,
  count = 0,
}) => (
  <Box w={300} h={177} dir="column" gap={8}>
    <Box dir="row" gap={8}>
      <Text variant="body" color="black" dir="row">
        투표 결과
      </Text>
      {count !== undefined && (
        <Box
          bg="blue200"
          round={5}
          align="center"
          justify="center"
          w={20}
          h={20}
        >
          <Text color="blue600">{count}</Text>
        </Box>
      )}
    </Box>

    <BorderedBox
      w={300}
      h={170}
      borderColor="gray200"
      borderSize={1}
      borderStyle="solid"
      round={5}
      pad={10}
      padRight={0}
      gap={10}
      dir="column"
      align="stretch"
    >
      <Scroll>
        <Box w="fill" gap={10}>
          {children}
        </Box>
      </Scroll>
    </BorderedBox>
  </Box>
);

export const TerminatedModalInner: SubComponents = {
  BoxWithTitle,
  TextBoxWithTitle,
  OptionResultsBox,
};
