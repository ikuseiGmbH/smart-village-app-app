import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon as RNEIcon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { colors, normalize } from '../../config';
import { mail, location, phone as phoneIcon, url as urlIcon } from '../../icons';
import { openLink, locationLink, locationString } from '../../helpers';
import { RegularText } from '../Text';
import { Icon } from '../Icon';
import { InfoBox, Wrapper } from '../Wrapper';

const addressOnPress = (address) => {
  const mapsString = locationString(address);
  const mapsLink = locationLink(mapsString);

  openLink(mapsLink);
};

/* eslint-disable complexity */
/* NOTE: we need to check a lot for presence, so this is that complex */
export const OperatingCompanyInfo = ({ address, contact, name, webUrls, openWebScreen }) => {
  const { addition, city, street, zip } = address;

  let companyAddress = '';

  if (!!addition || !!city || !!street || !!zip) {
    // build the address in multiple steps to check every data before rendering
    if (addition) {
      companyAddress += `${addition}${'\n'}`;
    }
    if (street) {
      companyAddress += `${street},${'\n'}`;
    }
    if (zip) {
      companyAddress += `${zip} `;
    }
    if (city) {
      companyAddress += city;
    }
  }

  return (
    <Wrapper>
      {!!name && (
        <InfoBox>
          <RegularText>{name}</RegularText>
        </InfoBox>
      )}

      {!!companyAddress && (
        <InfoBox>
          <Icon icon={location(colors.primary)} style={styles.margin} />
          <TouchableOpacity onPress={() => addressOnPress(companyAddress)}>
            <RegularText primary>{companyAddress}</RegularText>
          </TouchableOpacity>
        </InfoBox>
      )}

      {!!contact &&
        (!!contact.firstName ||
          !!contact.lastName ||
          !!contact.phone ||
          !!contact.email ||
          !!contact.fax) && (
        <View>
          {(!!contact.firstName || !!contact.lastName) && (
            <InfoBox>
              <RNEIcon
                name="person"
                type="material"
                color={colors.primary}
                iconStyle={{ marginRight: normalize(10) }}
              />
              {!!contact.firstName && <RegularText>{contact.firstName} </RegularText>}
              {!!contact.lastName && <RegularText>{contact.lastName}</RegularText>}
            </InfoBox>
          )}
          {!!contact.phone && (
            <InfoBox>
              <Icon icon={phoneIcon(colors.primary)} style={styles.margin} />
              <TouchableOpacity onPress={() => openLink(`tel:${contact.phone}`)}>
                <RegularText primary>{contact.phone}</RegularText>
              </TouchableOpacity>
            </InfoBox>
          )}
          {!!contact.email && (
            <InfoBox>
              <Icon icon={mail(colors.primary)} style={styles.margin} />
              <TouchableOpacity onPress={() => openLink(`mailto:${contact.email}`)}>
                <RegularText primary>{contact.email}</RegularText>
              </TouchableOpacity>
            </InfoBox>
          )}
          {!!contact.fax && (
            <InfoBox>
              <RNEIcon
                name="print"
                type="material"
                color={colors.primary}
                iconStyle={{ marginRight: normalize(10) }}
              />
              <RegularText primary>{contact.fax}</RegularText>
            </InfoBox>
          )}
        </View>
      )}

      {!!webUrls &&
        webUrls.map((item, index) => {
          const { url } = item;

          if (!url) return null;

          return (
            <InfoBox key={index}>
              <Icon icon={urlIcon(colors.primary)} style={styles.margin} />
              <TouchableOpacity onPress={() => openLink(url, openWebScreen)}>
                <RegularText primary>{url}</RegularText>
              </TouchableOpacity>
            </InfoBox>
          );
        })}
    </Wrapper>
  );
};
/* eslint-enable complexity */

const styles = StyleSheet.create({
  margin: {
    marginRight: normalize(10)
  }
});

OperatingCompanyInfo.propTypes = {
  address: PropTypes.object,
  name: PropTypes.string,
  contact: PropTypes.object,
  webUrls: PropTypes.array,
  openWebScreen: PropTypes.func
};
