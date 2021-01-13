import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Query } from 'react-apollo';

import { NetworkContext } from '../NetworkProvider';
import { auth } from '../auth';
import { colors, consts, device, normalize } from '../config';
import {
  BookmarkHeader,
  EventRecord,
  Icon,
  LoadingContainer,
  NewsItem,
  PointOfInterest,
  SafeAreaViewFlex,
  Tour,
  WrapperRow
} from '../components';
import { getQuery, QUERY_TYPES } from '../queries';
import { arrowLeft, share } from '../icons';
import { graphqlFetchPolicy, openShare } from '../helpers';
import { useRefreshTime } from '../hooks';

const getComponent = (query) => {
  const COMPONENTS = {
    [QUERY_TYPES.NEWS_ITEM]: NewsItem,
    [QUERY_TYPES.EVENT_RECORD]: EventRecord,
    [QUERY_TYPES.POINT_OF_INTEREST]: PointOfInterest,
    [QUERY_TYPES.TOUR]: Tour
  };

  return COMPONENTS[query];
};

const getRefreshInterval = (query) => {
  const REFRESH_INTERVALS = {
    [QUERY_TYPES.NEWS_ITEM]: consts.REFRESH_INTERVALS.NEWS,
    [QUERY_TYPES.EVENT_RECORD]: consts.REFRESH_INTERVALS.EVENTS,
    [QUERY_TYPES.POINT_OF_INTEREST]: consts.REFRESH_INTERVALS.POINTS_OF_INTEREST,
    [QUERY_TYPES.TOUR]: consts.REFRESH_INTERVALS.TOURS
  };

  return REFRESH_INTERVALS[query];
};

export const DetailScreen = ({ navigation }) => {
  const { isConnected, isMainserverUp } = useContext(NetworkContext);
  const query = navigation.getParam('query', '');
  const queryVariables = navigation.getParam('queryVariables', {});
  const [refreshing, setRefreshing] = useState(false);

  if (!query || !queryVariables || !queryVariables.id) return null;

  const refreshTime = useRefreshTime(`${query}-${queryVariables.id}`, getRefreshInterval(query));

  useEffect(() => {
    isConnected && auth();
  }, []);

  if (!refreshTime) {
    return (
      <LoadingContainer>
        <ActivityIndicator color={colors.accent} />
      </LoadingContainer>
    );
  }

  const refresh = async (refetch) => {
    setRefreshing(true);
    isConnected && (await refetch());
    setRefreshing(false);
  };

  const details = navigation.getParam('details', {});
  const fetchPolicy = graphqlFetchPolicy({
    isConnected,
    isMainserverUp,
    refreshTime
  });

  return (
    <Query query={getQuery(query)} variables={{ id: queryVariables.id }} fetchPolicy={fetchPolicy}>
      {({ data, loading, refetch }) => {
        if (loading) {
          return (
            <LoadingContainer>
              <ActivityIndicator color={colors.accent} />
            </LoadingContainer>
          );
        }

        // we can have `data` from GraphQL or `details` from the previous list view.
        // if there is no cached `data` or network fetched `data` we fallback to the `details`.
        if ((!data || !data[query]) && !details) return null;

        const Component = getComponent(query);

        return (
          <SafeAreaViewFlex>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => refresh(refetch)}
                  colors={[colors.accent]}
                  tintColor={colors.accent}
                />
              }
            >
              <Component data={(data && data[query]) || details} navigation={navigation} />
            </ScrollView>
          </SafeAreaViewFlex>
        );
      }}
    </Query>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    alignItems: 'center'
  },
  icon: {
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(4)
  },
  iconLeft: {
    paddingLeft: normalize(14),
    paddingRight: normalize(7),
    paddingVertical: normalize(4)
  },
  iconRight: {
    paddingLeft: normalize(7),
    paddingRight: normalize(14),
    paddingVertical: normalize(4)
  }
});

DetailScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  const shareContent = navigation.getParam('shareContent', '');
  const categoryId = navigation.getParam('categoryId', '');
  const query = navigation.getParam('query', '');
  const queryVariables = navigation.getParam('queryVariables', {});

  const { headerRight } = navigationOptions;

  const StyledBookmarkHeader = query && queryVariables?.id ?
    <BookmarkHeader
      id={queryVariables.id}
      categoryId={categoryId}
      query={query}
      style={styles.iconLeft}
    /> :
    null;

  return {
    headerLeft: (
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityLabel="Zurück Taste"
          accessibilityHint="Navigieren zurück zur vorherigen Seite"
        >
          <Icon xml={arrowLeft(colors.lightestText)} style={styles.icon} />
        </TouchableOpacity>
      </View>
    ),
    headerRight: (
      <WrapperRow style={styles.headerRight}>
        {StyledBookmarkHeader}
        {!!shareContent && (
          <TouchableOpacity
            onPress={() => openShare(shareContent)}
            accessibilityLabel="Teilen Taste"
            accessibilityHint="Inhalte auf der Seite teilen"
          >
            {device.platform === 'ios' ? (
              <Icon
                name="ios-share"
                size={normalize(26)}
                iconColor={colors.lightestText}
                style={headerRight ? styles.iconLeft : styles.iconRight}
              />
            ) : (
              <Icon
                xml={share(colors.lightestText)}
                style={headerRight ? styles.iconLeft : styles.iconRight}
              />
            )}
          </TouchableOpacity>
        )}
        {!!headerRight && headerRight}
      </WrapperRow>
    )
  };
};

DetailScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
