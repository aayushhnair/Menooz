import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import GSafeAreaView from '../../../components/common/GSafeAreaView';
import GButton from '../../../components/common/GButton';
import {colors, styles} from '../../../themes';
import GHeader from '../../../components/common/GHeader';
import {StackNav} from '../../../navigation/NavigationKeys';
import {moderateScale} from '../../../common/constants';
import GInput from '../../../components/common/GInput';
import strings from '../../../i18n/strings';
import {RadioFilled, RadioUnfilled} from '../../../assets/svgs';
import GText from '../../../components/common/GText';
import GKeyBoardAvoidingWrapper from '../../../components/common/GKeyBoardAvoidingWrapper';

export default function NewAddress({navigation, route}) {
  const {item} = route.params;
  const [fullName, setFullName] = useState(item?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(item?.contactNo || '');
  const [addressLink1, setAddressLink1] = useState(item?.addressLink1 || '');
  const [addressLink2, setAddressLink2] = useState(item?.addressLink2 || '');
  const [city, setCity] = useState(item?.city || '');
  const [state, setState] = useState(item?.state || '');
  const [zipCode, setZipCode] = useState(item?.zipCode || '');
  const [defaultAddress, setDefaultAddress] = useState(
    item?.isDefault || false,
  );

  const onChangeFullName = text => setFullName(text);
  const onChangePhoneNumber = text => setPhoneNumber(text);
  const onChangeAddressLink1 = text => setAddressLink1(text);
  const onChangeAddressLink2 = text => setAddressLink2(text);
  const onChangeCity = text => setCity(text);
  const onChangeState = text => setState(text);
  const onChangeZipCode = text => setZipCode(text);
  const onChangeDefaultAddress = () => setDefaultAddress(!defaultAddress);

  const onPressSave = () => navigation.goBack();
  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={StackNav.NewAddress} />
      <GKeyBoardAvoidingWrapper containerStyle={localStyles.bgContainer}>
        <View style={localStyles.container}>
          <GInput
            placeholder={strings.enterFullName}
            placeholderTextColor={colors.labelColor}
            label={strings.fullName}
            value={fullName}
            labelStyle={styles.mh0}
            errorStyle={styles.mh0}
            toGetTextFieldValue={onChangeFullName}
            inputStyle={localStyles.inputStyle}
          />
          <GInput
            placeholder={strings.enterPhoneNumber}
            placeholderTextColor={colors.labelColor}
            label={strings.phoneNumber}
            value={phoneNumber}
            labelStyle={localStyles.labelStyle}
            errorStyle={styles.mh0}
            toGetTextFieldValue={onChangePhoneNumber}
            innerInputStyle={styles.p15}
            inputStyle={localStyles.inputStyle}
          />
          <GInput
            placeholder={strings.enterAddressLink1}
            placeholderTextColor={colors.labelColor}
            label={strings.addressLink1}
            value={addressLink1}
            labelStyle={localStyles.labelStyle}
            errorStyle={styles.mh0}
            toGetTextFieldValue={onChangeAddressLink1}
            inputStyle={localStyles.inputStyle}
          />
          <GInput
            placeholder={strings.enterAddressLink2}
            placeholderTextColor={colors.labelColor}
            label={strings.addressLink2}
            value={addressLink2}
            labelStyle={localStyles.labelStyle}
            errorStyle={styles.mh0}
            toGetTextFieldValue={onChangeAddressLink2}
            inputStyle={localStyles.inputStyle}
          />
          <GInput
            placeholder={strings.enterCity}
            placeholderTextColor={colors.labelColor}
            label={strings.city}
            value={city}
            labelStyle={localStyles.labelStyle}
            errorStyle={styles.mh0}
            toGetTextFieldValue={onChangeCity}
            inputStyle={localStyles.inputStyle}
          />
          <View style={localStyles.container3}>
            <GInput
              placeholder={strings.enterState}
              placeholderTextColor={colors.labelColor}
              label={strings.state}
              value={state}
              style={[{width: '46%'}]}
              labelStyle={localStyles.labelStyle}
              maxLength={5}
              inputMode="default"
              errorStyle={styles.mh0}
              toGetTextFieldValue={onChangeState}
              inputStyle={localStyles.inputStyle}
            />
            <GInput
              placeholder={strings.enterZipCode}
              placeholderTextColor={colors.labelColor}
              label={strings.zipCode}
              value={zipCode}
              style={[{width: '46%'}]}
              labelStyle={localStyles.labelStyle}
              maxLength={3}
              keyboardType={'decimal-pad'}
              errorStyle={styles.mh0}
              toGetTextFieldValue={onChangeZipCode}
              inputStyle={localStyles.inputStyle}
            />
          </View>
          <View style={localStyles.defaultAddressContainer}>
            <TouchableOpacity onPress={onChangeDefaultAddress}>
              {defaultAddress ? <RadioFilled /> : <RadioUnfilled />}
            </TouchableOpacity>
            <GText type="m16" style={styles.ml10}>
              {strings.defaultAddress}
            </GText>
          </View>
          <GButton
            onPress={onPressSave}
            containerStyle={localStyles.checkOutButton}
            title={strings.saveAddress}
            bgColor={colors.green}
            textType={'b16'}
            color={colors.white}
          />
        </View>
      </GKeyBoardAvoidingWrapper>
    </GSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  container: {
    ...styles.p20,
    ...styles.mv30,
    ...styles.mh20,
    backgroundColor: colors.white,
    borderRadius: moderateScale(20),
  },
  bgContainer: {
    backgroundColor: colors.grayscale2,
    flex: 1,
  },
  inputStyle: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.shadow2,
    ...styles.mh0,
  },
  labelStyle: {
    ...styles.mh0,
    ...styles.mt20,
  },
  container3: {
    ...styles.flexRow,
    ...styles.justifyBetween,
  },
  defaultAddressContainer: {
    ...styles.flexRow,
    ...styles.flex,
    ...styles.mt25,
    ...styles.alignCenter,
  },
  checkOutButton: {
    ...styles.mt20,
  },
});
