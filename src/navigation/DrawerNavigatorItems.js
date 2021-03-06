import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-elements';

import { colors, normalize } from '../config';
import { Text, Touchable } from '../components';

const getActiveRoute = (navigationState) => {
  if (
    !navigationState.routes ||
    !navigationState.routes.length ||
    navigationState.index >= navigationState.routes.length
  ) {
    return navigationState;
  }

  const childActiveRoute = navigationState.routes[navigationState.index];
  return getActiveRoute(childActiveRoute.state ?? childActiveRoute);
};

/**
 * Component that renders the navigation list in the drawer.
 *
 * based on:
 *   https://github.com/react-navigation/drawer/blob/c5954d744f463e7f1c67941b8eb6914c0101e56c/src/views/DrawerNavigatorItems.tsx
 */
const DrawerNavigatorItems = ({ drawerRoutes, navigation, state }) => {
  /**
   * based on:
   *   https://github.com/react-navigation/drawer/blob/c5954d744f463e7f1c67941b8eb6914c0101e56c/src/views/DrawerSidebar.tsx#L67
   *
   * but we want to navigate always inside our single app stack
   */
  const handleItemPress = (itemInfo) => {
    navigation.navigate(itemInfo.screen, itemInfo.params);
    navigation.closeDrawer();
  };
  const activeRoute = getActiveRoute(state);

  return (
    <ScrollView bounces={false}>
      {Object.keys(drawerRoutes).map((route, index) => {
        const itemInfo = drawerRoutes[route];
        const focused =
          (activeRoute?.params?.rootRouteName ?? 'AppStack') === itemInfo.params.rootRouteName;
        const fontFamily = focused ? 'bold' : 'regular';
        const accessibilityLabel = itemInfo.params.title;

        return (
          <View key={itemInfo.params.title}>
            {index === 0 && <Divider style={styles.divider} />}
            <Touchable
              accessible
              accessibilityLabel={accessibilityLabel}
              onPress={() => handleItemPress(itemInfo)}
              delayPressIn={0}
            >
              <Text style={[styles.label, { color: colors.lightestText }, { fontFamily }]}>
                {itemInfo.params.title}
              </Text>
            </Touchable>
            <Divider style={styles.divider} />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'regular',
    fontSize: normalize(16),
    lineHeight: normalize(22),
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(12)
  },
  divider: {
    backgroundColor: colors.lightestText,
    height: StyleSheet.hairlineWidth,
    opacity: 0.3
  }
});

DrawerNavigatorItems.displayName = 'DrawerNavigatorItems';

DrawerNavigatorItems.propTypes = {
  drawerRoutes: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

DrawerNavigatorItems.defaultProps = {
  activeTintColor: colors.lightestText,
  activeBackgroundColor: 'transparent',
  inactiveTintColor: colors.lightestText,
  inactiveBackgroundColor: 'transparent'
};

export default DrawerNavigatorItems;
