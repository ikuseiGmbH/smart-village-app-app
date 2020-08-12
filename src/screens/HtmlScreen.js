import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Query } from 'react-apollo';

import { NetworkContext } from '../NetworkProvider';
import { auth } from '../auth';
import { colors, normalize } from '../config';
import { Button, HtmlView, Icon, LoadingContainer, SafeAreaViewFlex, Wrapper } from '../components';
import { graphqlFetchPolicy, trimNewLines } from '../helpers';
import { getQuery } from '../queries';
import { arrowLeft } from '../icons';

export class HtmlScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon icon={arrowLeft(colors.lightestText)} style={styles.icon} />
          </TouchableOpacity>
        </View>
      )
    };
  };

  static contextType = NetworkContext;

  componentDidMount() {
    const isConnected = this.context.isConnected;

    isConnected && auth();
  }

  render() {
    const { navigation } = this.props;
    const query = navigation.getParam('query', '');
    const queryVariables = navigation.getParam('queryVariables', '');
    const title = navigation.getParam('title', '');
    const rootRouteName = navigation.getParam('rootRouteName', '');
    const subQuery = navigation.getParam('subQuery', '');

    if (!query || !queryVariables || !queryVariables.name) return null;

    const { isConnected, isMainserverUp } = this.context;
    const fetchPolicy = graphqlFetchPolicy({ isConnected, isMainserverUp });

    return (
      <Query
        query={getQuery(query)}
        variables={{ name: queryVariables.name }}
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

          if (!data || !data.publicHtmlFile || !data.publicHtmlFile.content) return null;

          return (
            <SafeAreaViewFlex>
              <ScrollView>
                <Wrapper>
                  <HtmlView html={trimNewLines(data.publicHtmlFile.content)} />
                  {!!subQuery && !!subQuery.routeName && (
                    <Button
                      title={subQuery.buttonTitle || `${title} öffnen`}
                      onPress={() =>
                        navigation.navigate({
                          routeName: subQuery.routeName,
                          params: {
                            title,
                            webUrl: subQuery.webUrl,
                            rootRouteName
                          }
                        })
                      }
                    />
                  )}
                </Wrapper>
              </ScrollView>
            </SafeAreaViewFlex>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: normalize(14)
  }
});

HtmlScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
