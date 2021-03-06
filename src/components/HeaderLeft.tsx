import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { colors, Icon, normalize } from '../config';

export const HeaderLeft = ({ onPress }: StackHeaderLeftButtonProps) =>
  onPress ? (
    <View>
      <TouchableOpacity
        onPress={onPress}
        accessibilityLabel="Zurück Taste"
        accessibilityHint="Navigieren zurück zur vorherigen Seite"
      >
        <Icon.ArrowLeft color={colors.lightestText} style={styles.icon} />
      </TouchableOpacity>
    </View>
  ) : null;

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: normalize(14)
  }
});
