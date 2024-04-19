import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {EmptyCart} from '../../assets/svgs';
import GText from '../common/GText';
import {colors, styles} from '../../themes';
import strings from '../../i18n/strings';
import {moderateScale} from '../../common/constants';
import GButton from '../common/GButton';

const EmptyListComponent = ({title, description, btnTitle, onPress, icon}) => {
  return (
    <View style={localStyles.emptyContainer}>
      <View style={localStyles.emptyContainer2}>
        <GText type="b24" color={colors.appwhite}>
          {title}
        </GText>
        <GText type="r16" color={colors.labelColor} style={styles.mt10}>
          {description}
        </GText>
        <GButton
          onPress={onPress}
          textType={'b16'}
          color={colors.appblack}
          title={btnTitle}
          bgColor={colors.appyellow}
          containerStyle={localStyles.startAddingBtn}
        />
      </View>
    </View>
  );
};

export default EmptyListComponent;

const localStyles = StyleSheet.create({
  emptyContainer: {
    ...styles.justifyCenter,
  },
  emptyContainer2: {
    ...styles.mt40,
    ...styles.g12,
    ...styles.center,
  },
  emptyCart: {
    padding: moderateScale(75),
    backgroundColor: colors.lightGreen2,
    borderRadius: moderateScale(200),
    alignSelf: 'center',
  },
  startAddingBtn: {
    ...styles.mt40,
    width: '100%',
  },
});
