import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import GHeader from '../../components/common/GHeader';
import {colors, styles} from '../../themes';
import {getHeight, moderateScale} from '../../common/constants';
import GText from '../../components/common/GText';
import strings from '../../i18n/strings';
import GInput from '../../components/common/GInput';
import {validatePhoneNumber} from '../../utils/validators';
import GButton from '../../components/common/GButton';
import {StackNav} from '../../navigation/NavigationKeys';


const ForgotPassword = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const onChangedPhoneNumber = val => {
    const {msg} = validatePhoneNumber(val.trim());
    setPhoneNumber(val.trim());
    setPhoneNumberError(msg);
  };

  const onSendMeLinkPress = () => {
    navigation.navigate(StackNav.NewPassword);
  };

  return (
    <GSafeAreaView style={localStyles.mainContainer}>
      <View>
        <GHeader headerTitle={strings.forgotPasswordHeader}></GHeader>
      </View>
      <View style={localStyles.root}>
        <View style={localStyles.container}>
          <GText type="b24" style={localStyles.text} color={colors.appyellow}>
            {strings.resetPassword}
          </GText>
          <GText type="m16" style={localStyles.text2} color={colors.labelColor}>
            {strings.resetPasswordText}
          </GText>
          <GInput
            label={strings.phoneNumber}
            value={phoneNumber}
            style={localStyles.textInput}
            inputStyle={localStyles.inputStyle}
            toGetTextFieldValue={onChangedPhoneNumber}
            keyboardType={'numeric'}
            _errorText={phoneNumberError}
            maxLength={10}
          />
          <GButton
            textType={'b16'}
            color={colors.appblack}
            style={localStyles.button}
            title={strings.sendMeLink}
            bgColor={colors.appyellow}
            onPress={onSendMeLinkPress}
            containerStyle={localStyles.buttonStyle}
          />
        </View>
      </View>
    </GSafeAreaView>
  );
};

export default ForgotPassword;

const localStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.appblack,
  },
  root: {
    ...styles.flex,
    backgroundColor: colors.appblack,
  },
  container: {
    ...styles.flex,
    marginVertical: getHeight(30),
    ...styles.mt30,
    borderRadius: moderateScale(21),
    marginHorizontal: getHeight(16),
    backgroundColor: colors.appblack,
    ...styles.mb30,
  },
  text: {
    ...styles.mt80,
    ...styles.mh20,
  },
  text2: {
    ...styles.mt20,
    ...styles.mh20,
  },
  textInput: {
    ...styles.mt50,
  },
  inputStyle: {
    borderColor: colors.grayScale3,
    borderWidth: moderateScale(1),
    backgroundColor: colors.white,
    borderRadius: moderateScale(7),
    ...styles.mh20,
  },
  buttonStyle: {
    ...styles.mh20,
    ...styles.mt30,
  },
});
