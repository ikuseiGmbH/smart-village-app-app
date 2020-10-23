import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { View } from 'react-native';
import _filter from 'lodash/filter';

import { device, texts } from '../../config';
import { HtmlView } from '../HtmlView';
import { Image } from '../Image';
import { Logo } from '../Logo';
import { Title, TitleContainer, TitleShadow } from '../Title';
import { Wrapper, WrapperWithOrientation } from '../Wrapper';
import { InfoCard } from './InfoCard';
import { TourCard } from './TourCard';
import { OperatingCompanyInfo } from './OperatingCompanyInfo';
import { ImagesCarousel } from '../ImagesCarousel';
import { OrientationContext } from '../../OrientationProvider';

/* eslint-disable complexity */
/* NOTE: we need to check a lot for presence, so this is that complex */
export const Tour = ({ data, navigation }) => {
  const { orientation, dimensions } = useContext(OrientationContext);
  const {
    addresses,
    category,
    contact,
    dataProvider,
    description,
    lengthKm,
    mediaContents,
    operatingCompany,
    title,
    webUrls
  } = data;
  const rootRouteName = navigation.getParam('rootRouteName', '');
  // action to open source urls
  const openWebScreen = (webUrl) =>
    navigation.navigate({
      routeName: 'Web',
      params: {
        title: 'Tour',
        webUrl,
        rootRouteName
      }
    });

  const logo = dataProvider && dataProvider.logo && dataProvider.logo.url;
  let images = [];

  !!mediaContents &&
    !!mediaContents.length &&
    _filter(
      mediaContents,
      (mediaContent) =>
        mediaContent.contentType === 'image' || mediaContent.contentType === 'thumbnail'
    ).forEach((item) => {
      !!item.sourceUrl &&
        !!item.sourceUrl.url &&
        images.push({
          picture: {
            uri: item.sourceUrl.url,
            copyright: item.copyright,
            captionText: item.captionText
          }
        });
    });

  return (
    <View>
      {!!images && images.length > 1 && <ImagesCarousel data={images} />}

      <WrapperWithOrientation orientation={orientation} dimensions={dimensions}>
        {!!images && images.length === 1 && <Image source={images[0].picture} />}

        {!!title && (
          <View>
            <TitleContainer>
              <Title accessibilityLabel={`${title} (Überschrift)`}>{title}</Title>
            </TitleContainer>
            {device.platform === 'ios' && <TitleShadow />}
          </View>
        )}

        <Wrapper>
          {!!logo && <Logo source={{ uri: logo }} />}

          <InfoCard category={category} addresses={addresses} contact={contact} webUrls={webUrls} />
        </Wrapper>

        <TourCard lengthKm={lengthKm} addresses={addresses} />

        {!!description && (
          <View>
            <TitleContainer>
              <Title accessibilityLabel={`${texts.tour.description} (Überschrift)`}>
                {texts.tour.description}
              </Title>
            </TitleContainer>
            {device.platform === 'ios' && <TitleShadow />}
            <Wrapper>
              <HtmlView
                html={description}
                openWebScreen={openWebScreen}
                orientation={orientation}
                dimensions={dimensions}
              />
            </Wrapper>
          </View>
        )}

        {!!operatingCompany && (
          <View>
            <TitleContainer>
              <Title accessibilityLabel={`${texts.tour.operatingCompany} (Überschrift)`}>
                {texts.tour.operatingCompany}
              </Title>
            </TitleContainer>
            {device.platform === 'ios' && <TitleShadow />}
            <OperatingCompanyInfo
              name={operatingCompany.name}
              address={operatingCompany.address}
              contact={operatingCompany.contact}
              webUrls={operatingCompany.contact.webUrls}
              openWebScreen={openWebScreen}
            />
          </View>
        )}
      </WrapperWithOrientation>
    </View>
  );
};
/* eslint-enable complexity */

Tour.propTypes = {
  data: PropTypes.object.isRequired,
  navigation: PropTypes.object
};
