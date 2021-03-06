import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { texts } from '../../../config';
import { ConsultationPreviewData } from '../../../types';

import { OParlPreviewEntry } from './OParlPreviewEntry';

type Props = {
  data: ConsultationPreviewData;
  navigation: StackNavigationProp<any>;
  withAgendaItem?: boolean;
};

// withAgendaItem === true means that it is shown as part of a paper
// and we want to give information about the corresponding agendaItem in the preview
// withAgendaItem === false means the opposite, so we want to show the information of the paper
export const ConsultationPreview = ({ data, navigation, withAgendaItem }: Props) => {
  const { id, type, agendaItem, meeting, paper } = data;

  const agendaItemText = agendaItem?.name ?? texts.oparl.agendaItem.agendaItem;

  const textWithAgendaItem = meeting?.name ? `${meeting.name}: ${agendaItemText}` : agendaItemText;
  const textWithPaper = paper?.name ?? paper?.reference ?? texts.oparl.paper.paper;

  const title = withAgendaItem ? textWithAgendaItem : textWithPaper;

  return (
    <OParlPreviewEntry
      id={id}
      type={type}
      title={title}
      navigation={navigation}
      screenTitle={texts.oparl.consultation.consultation}
    />
  );
};
