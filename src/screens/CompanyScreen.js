import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Query } from 'react-apollo';

import { NetworkContext } from '../NetworkProvider';
import { colors, device, normalize, texts } from '../config';
import {
  BoldText,
  Image,
  LoadingContainer,
  SafeAreaViewFlex,
  ServiceBox,
  Title,
  TitleContainer,
  TitleShadow,
  WrapperWrap
} from '../components';
import { getQuery } from '../queries';
import { graphqlFetchPolicy } from '../helpers';
import TabBarIcon from '../components/TabBarIcon';

export class CompanyScreen extends React.PureComponent {
  static contextType = NetworkContext;

  render() {
    const { navigation } = this.props;
    const { isConnected, isMainserverUp } = this.context;
    const fetchPolicy = graphqlFetchPolicy({ isConnected, isMainserverUp });

    return (
      <SafeAreaViewFlex>
        <Query
          query={getQuery('publicJsonFile')}
          variables={{ name: 'homeCompanies' }}
          fetchPolicy={fetchPolicy}
        >
          {({ data, loading }) => {
            if (loading) {
              return (
                <LoadingContainer>
                  <ActivityIndicator color={colors.accent} />
                </LoadingContainer>
              );
            }

            let publicJsonFileContent =
              data && data.publicJsonFile && JSON.parse(data.publicJsonFile.content);

            if (!publicJsonFileContent || !publicJsonFileContent.length) return null;

            return (
              <ScrollView>
                <TitleContainer>
                  <Title>{texts.homeTitles.company}</Title>
                </TitleContainer>
                {device.platform === 'ios' && <TitleShadow />}
                <View style={{ padding: normalize(14) }}>
                  <WrapperWrap>
                    {publicJsonFileContent.map((item, index) => {
                      return (
                        <ServiceBox key={index + item.title}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate({
                                routeName: item.routeName,
                                params: item.params
                              })
                            }
                          >
                            <View>
                              {item.iconName ? (
                                <TabBarIcon
                                  name={item.iconName}
                                  size={30}
                                  style={styles.serviceIcon}
                                />
                              ) : (
                                <Image
                                  source={{ uri: item.icon }}
                                  style={styles.serviceImage}
                                  PlaceholderContent={null}
                                />
                              )}
                              <BoldText small primary>
                                {item.title}
                              </BoldText>
                            </View>
                          </TouchableOpacity>
                        </ServiceBox>
                      );
                    })}
                  </WrapperWrap>
                </View>
              </ScrollView>
            );
          }}
        </Query>
      </SafeAreaViewFlex>
    );
  }
}

const styles = StyleSheet.create({
  serviceIcon: {
    alignSelf: 'center',
    height: normalize(40),
    paddingVertical: normalize(7),
    marginBottom: normalize(7)
  },
  serviceImage: {
    alignSelf: 'center',
    height: normalize(40),
    marginBottom: normalize(7),
    resizeMode: 'contain',
    width: '100%'
  }
});

CompanyScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
