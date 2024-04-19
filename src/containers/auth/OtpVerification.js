import {
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import GText from '../../components/common/GText';
import {colors, styles} from '../../themes';
import {
  getHeight,
  getWidth,
  isAndroid,
  moderateScale,
} from '../../common/constants';
import {MailBox, Mark} from '../../assets/svgs';
import GInput from '../../components/common/GInput';
import typography from '../../themes/typography';
import flex from '../../themes/flex';
import GButton from '../../components/common/GButton';
import strings from '../../i18n/strings';
import images from '../../assets/images';
import {StackNav, TabNav} from '../../navigation/NavigationKeys';

const OtpVerification = ({navigation}) => {
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [focus, setFocus] = useState('');
  const [verifyModal, setVerifyModal] = useState(false);

  const pin1 = useRef(null);
  const pin2 = useRef(null);
  const pin3 = useRef(null);
  const pin4 = useRef(null);

  const onOtpInputCommon = (val, setFunction, ref, isFirst) => {
    !isFirst && setFunction(val);
    if (val.length > 0) {
      isFirst && setFunction(val);
      ref.current.focus();
    }
  };

  const onPinKeyPress = (event, otp, pin) => {
    if (event?.nativeEvent?.key == 'Backspace' && otp?.length == 0) {
      pin?.current?.focus();
    }
  };

  const onPin1Change = val => onOtpInputCommon(val, setOtp1, pin2, true);
  const onPin2Change = val => onOtpInputCommon(val, setOtp2, pin3);
  const onPin3Change = val => onOtpInputCommon(val, setOtp3, pin4);
  const onPin4Change = val => onOtpInputCommon(val, setOtp4, pin4);

  const onPin2KeyPress = event => onPinKeyPress(event, otp2, pin1);
  const onPin3KeyPress = event => onPinKeyPress(event, otp3, pin2);
  const onPin4KeyPress = event => onPinKeyPress(event, otp4, pin3);

  const focusedStyle = pin => {
    return {borderColor: focus == pin ? colors.lightGreen : colors.grayScale3};
  };

  const onFocus = () => {
    if (pin1.current.isFocused()) {
      setFocus('pin1');
    } else if (pin2.current.isFocused()) {
      setFocus('pin2');
    } else if (pin3.current.isFocused()) {
      setFocus('pin3');
    } else if (pin4.current.isFocused()) {
      setFocus('pin4');
    }
  };

  const onBlur = () => {
    setFocus('');
  };

  const onVerifyPressed = () => {
    setVerifyModal(true);
  };
  const onResendPressed = () => {};
  const onBrowseHomePressed = () => {
    setVerifyModal(false);
    navigation.navigate(StackNav.TabBar);
  };
  return (
    <GSafeAreaView style={localStyles.root}>
      <ScrollView
        style={localStyles.container}
        contentContainerStyle={styles.center}>
        <GText type={'m18'} color={colors.textColor} style={{marginTop: 50}}>
          {strings.enter4digitCode}
        </GText>
        <View style={localStyles.container2}>
          <MailBox />
        </View>
        <View style={localStyles.container3}>
          <TextInput
            ref={pin1}
            style={[localStyles.otpBox, focusedStyle('pin1')]}
            maxLength={1}
            onFocus={onFocus}
            onBlur={onBlur}
            keyboardType="number-pad"
            onChangeText={onPin1Change}
          />
          <TextInput
            ref={pin2}
            style={[localStyles.otpBox, focusedStyle('pin2')]}
            maxLength={1}
            onFocus={onFocus}
            onBlur={onBlur}
            keyboardType="number-pad"
            onKeyPress={onPin2KeyPress}
            onChangeText={onPin2Change}
          />
          <TextInput
            ref={pin3}
            style={[localStyles.otpBox, focusedStyle('pin3')]}
            maxLength={1}
            onFocus={onFocus}
            onBlur={onBlur}
            keyboardType="number-pad"
            onKeyPress={onPin3KeyPress}
            onChangeText={onPin3Change}
          />
          <TextInput
            ref={pin4}
            style={[localStyles.otpBox, focusedStyle('pin4')]}
            maxLength={1}
            onFocus={onFocus}
            onBlur={onBlur}
            keyboardType="number-pad"
            onKeyPress={onPin4KeyPress}
            onChangeText={onPin4Change}
          />
        </View>
        <View style={localStyles.container4}>
          <GText type="m14" color={colors.textColor} align={'center'}>
            {strings.didNotGetCode}
          </GText>
          <GButton
            title={strings.resendCode}
            style={{...styles.ml10}}
            textType="b14"
            color={colors.green}
            onPress={onResendPressed}
          />
        </View>
        <GButton
          title={strings.verify}
          textType="b16"
          bgColor={colors.green}
          color={colors.white}
          containerStyle={localStyles.verifyBtn}
          onPress={onVerifyPressed}
        />
      </ScrollView>
      <Modal
        visible={verifyModal}
        transparent={true}
        onRequestClose={() => setVerifyModal(false)}>
        <View style={localStyles.modalContainer}>
          <View
            style={[
              localStyles.container,
              {
                marginTop: getHeight(228),
                marginBottom: getHeight(150),
                ...styles.center,
              },
            ]}>
            <ImageBackground
              source={images.verified}
              resizeMode="cover"
              style={localStyles.image}>
              <View style={localStyles.verifyMark}>
                <Mark />
              </View>
            </ImageBackground>
            <GText type="b24" color={colors.textColor}>
              {strings.verified}
            </GText>
            <GText
              type="m16"
              align={'center'}
              style={localStyles.text}
              color={colors.labelColor}>
              {strings.verifiedSuccessfully}
            </GText>
            <GButton
              title={strings.browseHome}
              bgColor={colors.green}
              textType="b16"
              color={colors.white}
              containerStyle={localStyles.browseHomeBtn}
              onPress={onBrowseHomePressed}
            />
          </View>
        </View>
      </Modal>
    </GSafeAreaView>
  );
};

export default OtpVerification;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.gray,
  },
  container: {
    ...styles.flex,
    backgroundColor: colors.white,
    marginTop: getHeight(97),
    marginHorizontal: moderateScale(16),
    borderRadius: moderateScale(30),
    marginBottom: getHeight(55),
  },
  container2: {
    ...styles.m20,
    backgroundColor: colors.lightGreen3,
    paddingVertical: getHeight(30),
    paddingHorizontal: moderateScale(70),
    borderRadius: moderateScale(17),
  },
  container3: {
    ...styles.flexRow,
    width: '90%',
    ...styles.mt60,
    marginHorizontal: moderateScale(25),
    ...styles.justifyBetween,
  },
  otpBox: {
    borderColor: colors.grayScale3,
    borderWidth: moderateScale(1),
    width: getWidth(68),
    height: moderateScale(68),
    borderRadius: moderateScale(25),
    ...typography.fontWeights.Medium,
    textAlign: 'center',
    ...typography.fontSizes.f30,
  },
  container4: {
    ...styles.flexRow,
    ...styles.center,
    marginTop: getHeight(60),
  },
  verifyBtn: {
    width: moderateScale(325),
    ...styles.mt30,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.transparent,
  },
  text: {
    ...styles.mt15,
    marginHorizontal: moderateScale(42),
  },
  image: {
    marginTop: getHeight(53),
    width: getWidth(220),
    height: getHeight(245),
    ...styles.center,
  },
  verifyMark: {
    paddingVertical: getHeight(60),
    paddingHorizontal: getWidth(50),
    borderRadius: moderateScale(80),
    backgroundColor: colors.lightGreen3,
  },
  browseHomeBtn: {
    ...styles.mt50,
    width: getWidth(332),
  },
});
