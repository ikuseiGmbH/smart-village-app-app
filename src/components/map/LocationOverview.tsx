import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-apollo';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebviewLeafletMessage } from 'react-native-webview-leaflet';
import { NavigationScreenProps, ScrollView } from 'react-navigation';

import { colors, normalize } from '../../config';
import { getQuery, QUERY_TYPES } from '../../queries';
import { LoadingContainer } from '../LoadingContainer';
import { SafeAreaViewFlex } from '../SafeAreaViewFlex';
import { PointOfInterest } from '../screens';
import { WebViewMap } from './WebViewMap';

type Props = {
  navigation: NavigationScreenProps
}

const mapToMapMarkers = (data: any) => {
  return data?.[QUERY_TYPES.POINTS_OF_INTEREST]?.map(
    (item: any) => {
      const { latitude, longitude } = item.location.geoLocation;

      return {
        id: item.id,
        position: {
          lat: latitude,
          lng: longitude
        }
      };
    }
  );
};

export const LocationOverview = ({ navigation }: Props) => {
  const [selectedPointOfInterest, setSelectedPointOfInterest] = useState<string>();

  const overviewQuery = getQuery(QUERY_TYPES.POINTS_OF_INTEREST);
  const { data: overviewData, loading } =
    useQuery(overviewQuery, { variables: { limit: 10, orderPoi: 'RAND', orderTour: 'RAND' } });

  const detailsQuery = getQuery(QUERY_TYPES.POINT_OF_INTEREST);
  const { data: detailsData, loading: detailsLoading } =
    useQuery(detailsQuery, { variables: { id: selectedPointOfInterest } });

  const onMessageReceived = useCallback((message: WebviewLeafletMessage) => {
    if (message.event === 'onMapMarkerClicked') {
      setSelectedPointOfInterest(message.payload?.mapMarkerID);
    }
  }, [setSelectedPointOfInterest, overviewData]);

  if (loading || !overviewData?.[QUERY_TYPES.POINTS_OF_INTEREST]) {
    return (
      <LoadingContainer>
        <ActivityIndicator color={colors.accent} />
      </LoadingContainer>
    );
  }

  return (
    <SafeAreaViewFlex>
      <ScrollView>
        <WebViewMap
          locations={mapToMapMarkers(overviewData)}
          onMessageReceived={onMessageReceived}
          style={styles.map}
          zoom={10}
        />
        <View style={styles.details}>
          {detailsLoading && <ActivityIndicator />}
          {!!detailsData?.[QUERY_TYPES.POINT_OF_INTEREST] &&
            <PointOfInterest
              data={detailsData[QUERY_TYPES.POINT_OF_INTEREST]}
              navigation={navigation}
              hideMap
            />}
        </View>
      </ScrollView>
    </SafeAreaViewFlex>
  );
};

const styles = StyleSheet.create({
  map: {
    height: normalize(200)
  },
  details: {
    marginTop: normalize(12)
  }
});
