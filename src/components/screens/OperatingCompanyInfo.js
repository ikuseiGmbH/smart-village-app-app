import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon as RNEIcon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { colors, normalize } from '../../config';
import { mail, link, location, phone as phoneIcon, url as urlIcon } from '../../icons';
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
  const contactPresent =
    !!contact &&
    (!!contact.firstName ||
      !!contact.lastName ||
      !!contact.phone ||
      !!contact.email ||
      !!contact.fax ||
      !!contact.www);
  let companyAddress = '';

  if (address) {
    const { addition, city, street, zip } = address;

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
  }

  if (!name && !companyAddress && !contactPresent && !webUrls) return null;

  return (
    <Wrapper>
      {!!name && (
        <InfoBox>
          <RegularText>{name}</RegularText>
        </InfoBox>
      )}

      {!!companyAddress && (
        <InfoBox>
          <Icon xml={location(colors.primary)} style={styles.margin} />
          <TouchableOpacity
            onPress={() => addressOnPress(companyAddress)}
            accessibilityLabel={`(Adresse) ${companyAddress} (Taste) (Wechselt zur Karten-App)`}
          >
            <RegularText primary>{companyAddress}</RegularText>
          </TouchableOpacity>
        </InfoBox>
      )}

      {contactPresent && (
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
              <Icon xml={phoneIcon(colors.primary)} style={styles.margin} />
              <TouchableOpacity
                onPress={() => openLink(`tel:${contact.phone}`)}
                accessibilityLabel={`(Telefonnummer) ${contact.phone} (Taste) (Wechselt zur Telefon-App)`}
              >
                <RegularText primary>{contact.phone}</RegularText>
              </TouchableOpacity>
            </InfoBox>
          )}
          {!!contact.email && (
            <InfoBox>
              <Icon xml={mail(colors.primary)} style={styles.margin} />
              <TouchableOpacity
                onPress={() => openLink(`mailto:${contact.email}`)}
                accessibilityLabel={`(E-mail-Adresse) ${contact.email} (Taste) (Wechselt zur Email-App)`}
              >
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
              <RegularText primary accessible accessibilityLabel={`(Fax) ${contact.fax}`}>
                {contact.fax}
              </RegularText>
            </InfoBox>
          )}
          {!!contact.www && (
            <InfoBox>
              <Icon xml={link(colors.primary)} style={styles.marginWww} />
              <TouchableOpacity
                onPress={() => openLink(contact.www, openWebScreen)}
                accessibilityLabel={`(Webseite) ${contact.www} (Taste) (Öffnet Webseite in der aktuellen App)`}
              >
                <RegularText primary>{contact.www}</RegularText>
              </TouchableOpacity>
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
              <Icon xml={urlIcon(colors.primary)} style={styles.margin} />
              <TouchableOpacity
                onPress={() => openLink(url, openWebScreen)}
                accessibilityLabel={`(Webseite) ${url} (Taste) (Öffnet Webseite in der aktuellen App)`}
              >
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
  },
  marginWww: {
    marginLeft: normalize(3),
    marginRight: normalize(7)
  }
});

OperatingCompanyInfo.propTypes = {
  address: PropTypes.object,
  name: PropTypes.string,
  contact: PropTypes.object,
  webUrls: PropTypes.array,
  openWebScreen: PropTypes.func
};
