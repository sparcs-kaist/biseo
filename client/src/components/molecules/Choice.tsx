import { theme } from "@/theme";
import styled from "@emotion/styled";
import type { Choice } from "biseo-interface/agenda";
import { Box, Text } from "@/components/atoms";
import { SelectIcon } from "@/assets";

const ChoiceContainer = styled.div<{
  chosen?: boolean;
}>`
  border-radius: 5px;
  background-color: ${props =>
    props.chosen ? props.theme.colors.blue600 : props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray200};
  padding: 6px 13px 6px 13px;
  width: 340px;
  height: 30px;
  gap: 10px;
`;

type ChoiceProps = {
  choice: Choice;
  chosen: boolean;
  onClick: () => void;
};

const ChoiceComponent: React.FC<ChoiceProps> = ({
  choice,
  chosen,
  onClick,
}) => {
  const iconColor = chosen ? theme.colors.blue600 : theme.colors.gray500;
  const textColor = chosen ? "white" : "gray500";
  return (
    <ChoiceContainer onClick={onClick} chosen={chosen}>
      <Box dir="row" gap={10}>
        <SelectIcon stroke={iconColor} />
        <Text variant="body" color={textColor}>
          {choice.name}
        </Text>
      </Box>
    </ChoiceContainer>
  );
};

const CompletedChoice: React.FC = () => (
  <ChoiceContainer onClick={() => null} chosen={true}>
    <Box dir="row" gap={10}>
      <SelectIcon stroke={theme.colors.blue600} />
      <Text variant="body" color="white">
        투표 완료
      </Text>
    </Box>
  </ChoiceContainer>
);

const NotVotableChoice: React.FC = () => (
  <ChoiceContainer onClick={() => null} chosen={false}>
    <Box dir="row" gap={10}>
      <SelectIcon stroke={theme.colors.gray500} />
      <Text variant="body" color="gray500">
        투표 권한이 없습니다.
      </Text>
    </Box>
  </ChoiceContainer>
);

export { ChoiceComponent, CompletedChoice, NotVotableChoice };
