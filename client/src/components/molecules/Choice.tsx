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

interface ChoiceProps {
  choice: Choice;
  chosen: boolean;
  onClick: () => void;
}

export const ChoiceComponent: React.FC<ChoiceProps> = ({
  choice,
  chosen,
  onClick,
}) => {
  return (
    <ChoiceContainer onClick={onClick} chosen={chosen}>
      <Box dir="row" gap={10}>
        <SelectIcon
          stroke={chosen ? theme.colors.blue600 : theme.colors.gray500}
        />
        <Text variant="body" color={chosen ? "white" : "gray500"}>
          {choice.name}
        </Text>
      </Box>
    </ChoiceContainer>
  );
};

export const CompletedChoice: React.FC = () => (
  <ChoiceContainer onClick={() => null} chosen={true}>
    <Box dir="row" gap={10}>
      <SelectIcon stroke={theme.colors.blue600} />
      <Text variant="body" color="white">
        투표 완료
      </Text>
    </Box>
  </ChoiceContainer>
);

export const NotVotableChoice: React.FC = () => (
  <ChoiceContainer onClick={() => null} chosen={false}>
    <Box dir="row" gap={10}>
      <SelectIcon stroke={theme.colors.gray500} />
      <Text variant="body" color="gray500">
        투표 권한이 없습니다.
      </Text>
    </Box>
  </ChoiceContainer>
);
