import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import strings from '../../i18n/strings';
import GHeader from '../../components/common/GHeader';
import {colors, styles} from '../../themes';
import GText from '../../components/common/GText';

export default function AboutUs() {
  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.aboutUs} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ph20}>
        <GText type="m20" style={styles.mv20}>
          {strings.aboutUs}
        </GText>
        <GText type="r16" color={colors.labelColor}>
          {strings.laurelText}
        </GText>
      </ScrollView>
    </GSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
});
