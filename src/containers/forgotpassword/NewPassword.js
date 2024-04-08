import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import strings from '../../i18n/strings';
import {colors, styles} from '../../themes';
import {getHeight, moderateScale} from '../../common/constants';
import GHeader from '../../components/common/GHeader';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import GInput from '../../components/common/GInput';
import GText from '../../components/common/GText';
import GButton from '../../components/common/GButton';
import {
  validateConfirmPassword,
  validatePassword,
} from '../../utils/validators';
import {Eye_checked, Eye_icon} from '../../assets/svgs';
import {StackNav} from '../../navigation/NavigationKeys';

const NewPassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);

  const PasswordIcon = () => {
    return (
      <GButton onPress={() => setPasswordVisibility(!passwordVisibility)}>
        {!passwordVisibility ? <Eye_icon /> : <Eye_checked />}
      </GButton>
    );
  };

  const changePasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };
  const ConfirmPasswordIcon = () => {
    return (
      <GButton onPress={changePasswordVisibility}>
        {!confirmPasswordVisibility ? <Eye_icon /> : <Eye_checked />}
      </GButton>
    );
  };
  const onChangedPassword = val => {
    const {msg} = validatePassword(val.trim());
    setPassword(val.trim());
    setPasswordError(msg);
  };

  const onChangedConfirmPassword = val => {
    const {msg} = validateConfirmPassword(password, val.trim());
    setConfirmPassword(val.trim());
    setConfirmPasswordError(msg);
  };

  const onDonePress = () => {
    navigation.navigate(StackNav.Login);
  };

  return (
    <GSafeAreaView style={localStyles.mainContainer}>
      <View>
        <GHeader headerTitle={strings.newPasswordHeader}></GHeader>
      </View>
      <View style={localStyles.root}>
        <View style={localStyles.container}>
          <GText type="b24" style={localStyles.text} color = {colors.appyellow}>
            {strings.newPasswordText}
          </GText>
          <GInput
            label={strings.password}
            value={password}
            style={localStyles.textInput}
            inputStyle={localStyles.inputStyle}
            toGetTextFieldValue={onChangedPassword}
            keyboardType={'default'}
            _errorText={passwordError}
            secureTextEntry={passwordVisibility}
            rightIcon={PasswordIcon}
          />
          <GInput
            label={strings.retypePassword}
            value={confirmPassword}
            style={localStyles.textInput}
            inputStyle={localStyles.inputStyle}
            toGetTextFieldValue={onChangedConfirmPassword}
            keyboardType={'default'}
            _errorText={confirmPasswordError}
            rightIcon={ConfirmPasswordIcon}
            secureTextEntry={confirmPasswordVisibility}
          />
          <GButton
            textType={'b16'}
            color={colors.appblack}
            style={localStyles.button}
            title={strings.done}
            bgColor={colors.appyellow}
            onPress={onDonePress}
            containerStyle={localStyles.buttonStyle}
          />
        </View>
      </View>
    </GSafeAreaView>
  );
};

export default NewPassword;

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
    ...styles.mt20,
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
