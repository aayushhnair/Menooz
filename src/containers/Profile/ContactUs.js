import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import strings from '../../i18n/strings';
import GHeader from '../../components/common/GHeader';
import {colors, styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import GText from '../../components/common/GText';
import images from '../../assets/images';
import {CallIcon, EmailIcon, LocationIcon} from '../../assets/svgs';

export default function ContactUs() {
  const iconStyle = moderateScale(35);
  const RenderDetail = ({title, icon}) => {
    return (
      <View style={localStyles.detailContainer}>
        {icon}
        <GText type="m16" color={colors.labelColor} style={styles.mh10}>
          {title}
        </GText>
      </View>
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.contactUs} />
      <View style={localStyles.bgContainer}>
        <View style={localStyles.container}>
          <GText type="m20" style={styles.mb20}>
            {strings.contactUs}
          </GText>
          <RenderDetail
            title={'+8801710000000\n+8801710000000'}
            icon={<CallIcon width={iconStyle} height={iconStyle} />}
          />
          <RenderDetail
            title={'Jonarban45@gmail.com'}
            icon={<EmailIcon width={iconStyle} height={iconStyle} />}
          />
          <RenderDetail
            title={'26/C Mohammadpur\nDhaka, Bangladesh'}
            icon={<LocationIcon width={iconStyle} height={iconStyle} />}
          />
          <Image source={images.map} style={localStyles.mapImageStyle} />
        </View>
      </View>
    </GSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  bgContainer: {
    backgroundColor: colors.grayscale2,
    flex: 1,
  },
  container: {
    ...styles.ph20,
    ...styles.pv20,
    ...styles.mv30,
    ...styles.mh20,
    backgroundColor: colors.white,
    borderRadius: moderateScale(20),
  },
  mapImageStyle: {
    width: '100%',
    height: moderateScale(170),
    resizeMode: 'cover',
    borderRadius: moderateScale(12),
  },
  detailContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.mb20,
  },
});
