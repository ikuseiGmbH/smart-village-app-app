import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { OParlObjectPreviewData, OParlObjectType } from '../../../types';

import { AgendaItemPreview } from './AgendaItemPreview';
import { BodyPreview } from './BodyPreview';
import { ConsultationPreview } from './ConsultationPreview';
import { FilePreview } from './FilePreview';
import { LegislativeTermPreview } from './LegislativeTermPreview';
import { LocationPreview } from './LocationPreview';
import { MeetingPreview } from './MeetingPreview';
import { MembershipPreview } from './MembershipPreview';
import { OrganizationPreview } from './OrganizationPreview';
import { PaperPreview } from './PaperPreview';
import { PersonPreview } from './PersonPreview';
import { SystemPreview } from './SystemPreview';

type PreviewProps = {
  data: OParlObjectPreviewData;
  navigation: StackNavigationProp<any>;
  withAgendaItem?: boolean;
  withPerson?: boolean;
};

// eslint-disable-next-line complexity
export const OParlPreviewComponent = ({
  data,
  navigation,
  withAgendaItem,
  withPerson
}: PreviewProps) => {
  switch (data.type) {
    case OParlObjectType.AgendaItem:
    case OParlObjectType.AgendaItem1:
      return <AgendaItemPreview data={data} navigation={navigation} />;
    case OParlObjectType.Body:
    case OParlObjectType.Body1:
      return <BodyPreview data={data} navigation={navigation} />;
    case OParlObjectType.Consultation:
    case OParlObjectType.Consultation1:
      return (
        <ConsultationPreview data={data} navigation={navigation} withAgendaItem={withAgendaItem} />
      );
    case OParlObjectType.File:
    case OParlObjectType.File1:
      return <FilePreview data={data} navigation={navigation} />;
    case OParlObjectType.LegislativeTerm:
    case OParlObjectType.LegislativeTerm1:
      return <LegislativeTermPreview data={data} navigation={navigation} />;
    case OParlObjectType.Location:
    case OParlObjectType.Location1:
      return <LocationPreview data={data} navigation={navigation} />;
    case OParlObjectType.Meeting:
    case OParlObjectType.Meeting1:
      return <MeetingPreview data={data} navigation={navigation} />;
    case OParlObjectType.Membership:
    case OParlObjectType.Membership1:
      return <MembershipPreview data={data} navigation={navigation} withPerson={withPerson} />;
    case OParlObjectType.Organization:
    case OParlObjectType.Organization1:
      return <OrganizationPreview data={data} navigation={navigation} />;
    case OParlObjectType.Paper:
    case OParlObjectType.Paper1:
      return <PaperPreview data={data} navigation={navigation} />;
    case OParlObjectType.Person:
    case OParlObjectType.Person1:
      return <PersonPreview data={data} navigation={navigation} />;
    case OParlObjectType.System:
    case OParlObjectType.System1:
      return <SystemPreview data={data} navigation={navigation} />;
    default:
      return null;
  }
};
