import {StyleSheet, View} from 'react-native';
import React from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import strings from '../../i18n/strings';
import GHeader from '../../components/common/GHeader';
import {colors, styles} from '../../themes';
import {FlashList} from '@shopify/flash-list';
import {faqData} from '../../Api/constant';
import GText from '../../components/common/GText';

export default function Faq() {
  const renderItem = ({item}) => {
    return (
      <View style={styles.ph20}>
        <GText type="m20" style={styles.mv20}>
          {item.question}
        </GText>
        <GText type="r16" color={colors.labelColor}>
          {item.answer}
        </GText>
      </View>
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.faq} />
      <FlashList
        data={faqData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={10}
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
