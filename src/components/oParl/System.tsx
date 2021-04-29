import React, { useCallback } from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { texts } from '../../config';
import { SystemData } from '../../types';
import { Wrapper } from '../Wrapper';
import { LineEntry } from './LineEntry';
import {
  ContactSection,
  ModifiedSection,
  OParlPreviewSection,
  WebRepresentation
} from './sections';

type Props = {
  data: SystemData;
  navigation: NavigationScreenProp<never>;
};

const { system: systemTexts } = texts.oparl;

export const System = ({ data, navigation }: Props) => {
  const {
    body,
    name,
    web,
    deleted,
    modified,
    created,
    oparlVersion,
    contactEmail,
    contactName,
    license,
    otherOparlVersion,
    product,
    vendor,
    website
  } = data;

  const onPressLicense = useCallback(() => navigation.push('Web', { webUrl: license }), [
    navigation,
    license
  ]);

  const onPressProduct = useCallback(() => navigation.push('Web', { webUrl: product }), [
    navigation,
    product
  ]);

  const onPressVendor = useCallback(() => navigation.push('Web', { webUrl: vendor }), [
    navigation,
    vendor
  ]);

  const onPressWebsite = useCallback(() => navigation.push('Web', { webUrl: website }), [
    navigation,
    website
  ]);

  return (
    <Wrapper>
      <LineEntry left={systemTexts.name} right={name} />
      <LineEntry left={systemTexts.oparlVersion} right={oparlVersion} />
      <OParlPreviewSection data={body} header={systemTexts.body} navigation={navigation} />
      <LineEntry left={systemTexts.product} right={product} onPress={onPressProduct} />
      <LineEntry left={systemTexts.vendor} right={vendor} onPress={onPressVendor} />
      <LineEntry left={systemTexts.website} right={website} onPress={onPressWebsite} />
      <ContactSection contactEmail={contactEmail} contactName={contactName} />
      <LineEntry
        left={systemTexts.otherOparlVersion}
        right={otherOparlVersion?.join(', ')}
        selectable
        fullText
      />
      <LineEntry left={systemTexts.license} right={license} onPress={onPressLicense} />
      <WebRepresentation name={name ?? systemTexts.system} navigation={navigation} web={web} />
      <ModifiedSection created={created} deleted={deleted} modified={modified} />
    </Wrapper>
  );
};