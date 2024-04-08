import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import GText from '../../components/common/GText';

//local imports
import GSafeAreaView from '../../components/common/GSafeAreaView';
import strings from '../../i18n/strings';
import GHeader from '../../components/common/GHeader';
import {colors, styles} from '../../themes';
import {termsAndConditionsData} from '../../Api/constant';

export default function TermAndConditions() {
  const renderItem = ({item}) => {
    return (
      <View style={styles.ph20}>
        <GText type="m20" style={styles.mv20}>
          {item.title}
        </GText>
        <GText type="r16" color={colors.labelColor}>
          {item.description}
        </GText>
      </View>
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.termAndConditions} />
      <FlatList
        data={termsAndConditionsData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </GSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
});
