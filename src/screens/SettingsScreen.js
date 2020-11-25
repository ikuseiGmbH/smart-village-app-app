import React, { useContext, useState } from 'react';
import { RefreshControl, SectionList, StyleSheet, TouchableOpacity, View } from 'react-native';

import { OrientationContext } from '../OrientationProvider';
import { colors, device, normalize, texts } from '../config';
import {
  Icon,
  RegularText,
  SafeAreaViewFlex,
  SettingsListItem,
  Title,
  TitleContainer,
  TitleShadow,
  ToggleListItem,
  Wrapper
} from '../components';
import { arrowLeft } from '../icons';
import { QUERY_TYPES } from '../queries';
import { GlobalSettingsContext } from '../GlobalSettingsProvider';
import { storageHelper } from '../helpers';

const keyExtractor = (item, index) => `index${index}-id${item.id}`;

const renderSectionHeader = ({ section: { title } }) =>
  !!title && (
    <View>
      <TitleContainer>
        <Title accessibilityLabel={`${title} (Überschrift)`}>{title}</Title>
      </TitleContainer>
      {device.platform === 'ios' && <TitleShadow />}
    </View>
  );

const renderItem = ({ item, index, section, orientation, dimensions }) =>
  item.type === 'toggle' ? (
    <ToggleListItem {...{ item, index, section }} />
  ) : (
    <SettingsListItem {...{ item, index, section, orientation, dimensions }} />
  );

export const SettingsScreen = () => {
  const { orientation, dimensions } = useContext(OrientationContext);
  const { listTypesSettings, setListTypesSettings } = useContext(GlobalSettingsContext);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = () => {
    setRefreshing(true);
    // TODO: do we need pull to refresh on the settings screen?
    // we simulate state change of `refreshing` with setting it to `true` first and after
    // a timeout to `false` again, which will result in a re-rendering of the screen.
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const onPress = async (selectedListType, queryType) =>
    setListTypesSettings((previousListTypes) => {
      const updatedListTypesSettings = {
        ...previousListTypes,
        [queryType]: selectedListType
      };

      storageHelper.setListTypesSettings(updatedListTypesSettings);

      return updatedListTypesSettings;
    });

  const sectionedData = [
    {
      data: [
        {
          title: texts.settingsTitles.pushNotifications,
          topDivider: true,
          type: 'toggle',
          value: false
        }
      ]
    },
    {
      data: [
        {
          title: texts.settingsTitles.analytics,
          topDivider: true,
          type: 'toggle',
          value: true
        }
      ]
    },
    {
      title: texts.settingsTitles.listLayouts.sectionTitle,
      data: [
        {
          title: texts.settingsTitles.listLayouts.newsItemsTitle,
          type: 'listLayout',
          listSelection: listTypesSettings[QUERY_TYPES.NEWS_ITEMS],
          onPress: (listType) => onPress(listType, QUERY_TYPES.NEWS_ITEMS)
        },
        {
          title: texts.settingsTitles.listLayouts.eventRecordsTitle,
          type: 'listLayout',
          listSelection: listTypesSettings[QUERY_TYPES.EVENT_RECORDS],
          onPress: (listType) => onPress(listType, QUERY_TYPES.EVENT_RECORDS)
        },
        {
          title: texts.settingsTitles.listLayouts.pointsOfInterestAndToursTitle,
          type: 'listLayout',
          listSelection: listTypesSettings[QUERY_TYPES.POINTS_OF_INTEREST_AND_TOURS],
          onPress: (listType) => onPress(listType, QUERY_TYPES.POINTS_OF_INTEREST_AND_TOURS),
          bottomDivider: true
        }
      ]
    }
  ];

  return (
    <SafeAreaViewFlex>
      <SectionList
        keyExtractor={keyExtractor}
        sections={sectionedData}
        renderItem={({ item, index, section }) =>
          renderItem({ item, index, section, orientation, dimensions })
        }
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={
          <Wrapper>
            <RegularText>{texts.settingsScreen.intro}</RegularText>
          </Wrapper>
        }
        stickySectionHeadersEnabled
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => refresh()}
            colors={[colors.accent]}
            tintColor={colors.accent}
          />
        }
      />
    </SafeAreaViewFlex>
  );
};

SettingsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: (
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityLabel="Zurück (Taste)"
          accessibilityHint="Navigieren zurück zur vorherigen Seite"
        >
          <Icon xml={arrowLeft(colors.lightestText)} style={styles.icon} />
        </TouchableOpacity>
      </View>
    )
  };
};

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: normalize(14)
  }
});
