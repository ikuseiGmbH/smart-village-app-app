import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import _isArray from 'lodash/isArray';

import { normalize } from '../../../config';
import { OParlObjectPreviewData } from '../../../types';
import { PreviewSection } from '../../PreviewSection';
import { OParlPreviewComponent } from '../previews/OParlPreviewComponent';
import { OParlItemPreview } from '../previews/OParlItemPreview';
import { AdditionalPreviewProps } from '../previews/additionalPreviewProps';

type Props = {
  additionalProps?: AdditionalPreviewProps;
  data?: OParlObjectPreviewData[] | OParlObjectPreviewData;
  header: string;
  navigation: NavigationScreenProp<never>;
};

export const OParlPreviewSection = ({ additionalProps, data, header, navigation }: Props) => {
  const renderPreview = useCallback(
    (itemData: OParlObjectPreviewData, key: number) => {
      return (
        <OParlPreviewComponent
          data={itemData}
          key={key}
          navigation={navigation}
          additionalProps={additionalProps}
        />
      );
    },
    [additionalProps, navigation]
  );

  if (_isArray(data)) {
    return (
      <View style={styles.marginTop}>
        <PreviewSection data={data} header={header} renderItem={renderPreview} />
      </View>
    );
  } else {
    return (
      <OParlItemPreview
        data={data}
        header={header}
        navigation={navigation}
        additionalProps={additionalProps}
      />
    );
  }
};

const styles = StyleSheet.create({
  marginTop: {
    marginTop: normalize(14)
  }
});