import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, normalize } from '../../config';
import { momentFormat } from '../../helpers';
import { Image } from '../Image';
import { RegularText } from '../Text';

export type HourlyWeatherData = {
  icon: string;
  isNow?: boolean;
  temperature: number;
  time: number;
};

export const HourlyWeather = ({ icon, temperature, time, isNow }: HourlyWeatherData) => {
  const formattedTime = momentFormat(time, 'HH:mm', 'x');

  return (
    <View
      style={{ ...styles.container, backgroundColor: isNow ? colors.lighterPrimary : undefined }}
    >
      <RegularText>{formattedTime}</RegularText>
      <Image
        source={{ uri: `http://openweathermap.org/img/wn/${icon}@2x.png` }}
        style={styles.icon}
      />
      <RegularText>{temperature}°C</RegularText>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: normalize(50)
  },
  container: {
    alignItems: 'center',
    paddingVertical: normalize(7)
  }
});
