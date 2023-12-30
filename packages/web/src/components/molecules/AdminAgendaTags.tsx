import { DownArrowIcon } from "@biseo/web/assets";
import { BorderedBox, Box } from "@biseo/web/components/atoms";
import { text } from "@biseo/web/styles";

export const AdminAgendaTags: React.FC = () => (
  <Box w={270} h={28} gap={16} dir="row" justify="center">
    <Box dir="row" w={122} h={28} gap={10} align="center">
      <p css={[text.body, text.black]}>투표 결과</p>
      <BorderedBox
        borderColor="gray200"
        bg="white"
        w={65}
        h={28}
        justify="center"
        borderSize={1}
        padHorizontal={15}
        round={5}
        borderStyle="solid"
        gap={99}
      >
        <p css={[text.option1, text.gray600]}>비공개</p>
      </BorderedBox>
    </Box>
    <Box dir="row" w={122} h={28} gap={10} align="center">
      <p css={[text.body, text.black]}>투표 상세</p>
      <BorderedBox
        borderColor="gray200"
        bg="white"
        w={65}
        h={28}
        justify="center"
        borderSize={1}
        padHorizontal={15}
        round={5}
        gap={99}
        borderStyle="solid"
      >
        <p css={[text.option1, text.gray600]}>무기명</p>
      </BorderedBox>
    </Box>
  </Box>
);

export const AdminAgendaTagsSelect: React.FC = () => (
  <Box w={270} h={28} justify="space-between" dir="row">
    <Box dir="row" w={130} h={28} gap={8} align="center">
      <p css={[text.body, text.black]}>투표 결과</p>
      <BorderedBox
        borderColor="gray200"
        bg="white"
        w={75}
        h={28}
        justify="space-between"
        borderSize={1}
        padHorizontal={12}
        padVertical={7}
        round={5}
        borderStyle="solid"
        dir="row"
      >
        <p css={[text.option1, text.gray600]}>비공개</p>
        <Box padVertical={7}>
          <DownArrowIcon />
        </Box>
      </BorderedBox>
    </Box>
    <Box dir="row" w={130} h={28} gap={8} align="center">
      <p css={[text.body, text.black]}>투표 상세</p>
      <BorderedBox
        borderColor="gray200"
        bg="white"
        w={75}
        h={28}
        justify="space-between"
        borderSize={1}
        padHorizontal={12}
        padVertical={7}
        round={5}
        borderStyle="solid"
        dir="row"
      >
        <p css={[text.option1, text.gray600]}>무기명</p>
        <Box padVertical={7}>
          <DownArrowIcon />
        </Box>
      </BorderedBox>
    </Box>
  </Box>
);
