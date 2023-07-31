import React from "react";
import { Box, Card, Text, Button } from "@/components/atoms";
import { OngoingAgenda } from "biseo-interface/agenda";
import { ChoiceComponent, CompletedChoice, NotVotableChoice } from "./Choice";

type OngoingAgendaProps = {
  agenda: OngoingAgenda;
};

export const OngoingAgendaCard: React.FC<OngoingAgendaProps> = ({ agenda }) => {
  const choices = agenda.user.votable ? (
    agenda.user.voted ? (
      <CompletedChoice />
    ) : (
      agenda.choices.map((choice, id) => (
        <ChoiceComponent
          key={id}
          choice={choice}
          chosen={false}
          onClick={() => null}
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
          <Button>
            <Text variant="option1" color="blue600">
              투표하기
            </Text>
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
