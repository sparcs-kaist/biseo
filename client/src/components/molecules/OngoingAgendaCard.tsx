import React, { useState, useCallback } from "react";
import { Box, Card, Text, Button } from "@/components/atoms";
import type { OngoingAgenda } from "biseo-interface/agenda";
import {
  ChoiceComponent,
  CompletedChoice,
  NotVotableChoice,
} from "@/components/molecules";
import { useAgenda } from "@/services/agenda";

interface OngoingAgendaProps {
  agenda: OngoingAgenda;
}

export const OngoingAgendaCard: React.FC<OngoingAgendaProps> = ({ agenda }) => {
  const [chosenChoiceId, setChosenChoiceId] = useState(0);
  const { voteAgenda } = useAgenda(state => ({
    voteAgenda: state.voteAgenda,
  }));

  const vote = useCallback(() => {
    if (chosenChoiceId === 0) {
      return null;
    } else {
      voteAgenda(chosenChoiceId, agenda.id);
    }
  }, [chosenChoiceId]);

  const choose = useCallback(
    (choiceId: number) => {
      if (choiceId === chosenChoiceId) {
        setChosenChoiceId(0);
      } else {
        setChosenChoiceId(choiceId);
      }
    },
    [chosenChoiceId],
  );

  const choices = agenda.user.votable ? (
    agenda.user.voted ? (
      <CompletedChoice />
    ) : (
      agenda.choices.map(choice => (
        <ChoiceComponent
          key={choice.id}
          choice={choice}
          chosen={choice.id == chosenChoiceId}
          onClick={() => choose(choice.id)}
        ></ChoiceComponent>
      ))
    )
  ) : (
    <NotVotableChoice />
  );

  return (
    <Card primary>
      <Box dir="column" gap={10}>
        <Box>
          <Text variant="title2" color="black">
            {agenda.title}
          </Text>
          <Text variant="subtitle" color="gray500">
            {agenda.content}
          </Text>
        </Box>
        <Box dir="column" gap={6}>
          <Text variant="body" color="blue600">
            {agenda.resolution}
          </Text>
          {choices}
        </Box>
        <Box dir="row" justify="end" w="fill">
          <Button onClick={() => vote()}>
            <Text variant="option1" color="blue600">
              투표하기
            </Text>
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
