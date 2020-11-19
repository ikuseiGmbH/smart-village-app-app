import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import MatomoTracker, { MatomoProvider } from 'matomo-tracker-react-native';

import { MainApp } from './src';
import { namespace, secrets } from './src/config';
import { matomoSettings } from './src/helpers';
import { useMatomoTrackAppStart } from './src/hooks';

const AppWithFonts = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useMatomoTrackAppStart();

  useEffect(() => {
    Font.loadAsync({
      'titillium-web-bold': require('./assets/fonts/TitilliumWeb-Bold.ttf'),
      'titillium-web-bold-italic': require('./assets/fonts/TitilliumWeb-BoldItalic.ttf'),
      'titillium-web-regular': require('./assets/fonts/TitilliumWeb-Regular.ttf'),
      'titillium-web-italic': require('./assets/fonts/TitilliumWeb-Italic.ttf'),
      'titillium-web-light': require('./assets/fonts/TitilliumWeb-Light.ttf'),
      'titillium-web-light-italic': require('./assets/fonts/TitilliumWeb-LightItalic.ttf')
    })
      .catch((error) => console.warn('An error occurred with loading the fonts', error))
      .finally(() => setFontLoaded(true));
  }, []);

  return fontLoaded ? <MainApp /> : null;
};

const App = () => {
  const [matomoInstance, setMatomoInstance] = useState();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    matomoSettings()
      .then((settings) =>
        setMatomoInstance(
          new MatomoTracker({
            urlBase: secrets[namespace].matomoUrl,
            siteId: secrets[namespace].matomoSiteId,
            userId: settings.userId,
            disabled: !settings.consent || __DEV__,
            log: __DEV__
          })
        )
      )
      .catch((error) => {
        console.warn('An error occurred with setup Matomo tracking', error);
        setMatomoInstance({ error: true });
      });
  }, []);

  if (!matomoInstance) return null;
  if (matomoInstance && matomoInstance.error) return <AppWithFonts />;

  return (
    <MatomoProvider instance={matomoInstance}>
      <AppWithFonts />
    </MatomoProvider>
  );
};

export default App;
