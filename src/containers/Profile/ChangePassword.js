import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// local imports
import {colors, styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import GHeader from '../../components/common/GHeader';
import GKeyBoardAvoidingWrapper from '../../components/common/GKeyBoardAvoidingWrapper';
import {Eye_checked, Eye_icon} from '../../assets/svgs';
import GInput from '../../components/common/GInput';
import margin from '../../themes/margin';
import strings from '../../i18n/strings';
import {validatePassword} from '../../utils/validators';
import GButton from '../../components/common/GButton';

export default function ChangePassword() {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [currentPasswordVisibility, setCurrentPasswordVisibility] =
    useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);

  const onChangedPassword = (val, setValue, setPswdError) => {
    const {msg} = validatePassword(val.trim());
    setValue(val.trim());
    setPswdError(msg);
  };

  const onPressUpdateBtn = () => navigation.goBack();

  const PasswordIcon = (isShow, setShow) => {
    return (
      <TouchableOpacity onPress={() => setShow(!isShow)}>
        {!isShow ? <Eye_icon /> : <Eye_checked />}
      </TouchableOpacity>
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.changePassword} />
      <GKeyBoardAvoidingWrapper containerStyle={localStyles.bgContainer}>
        <View style={localStyles.container}>
          <GInput
            label={strings.currentPassword}
            keyboardType={'default'}
            style={margin.mt30}
            value={currentPassword}
            secureTextEntry={currentPasswordVisibility}
            toGetTextFieldValue={text =>
              onChangedPassword(
                text,
                setCurrentPassword,
                setCurrentPasswordError,
              )
            }
            _errorText={currentPasswordError}
            rightIcon={() =>
              PasswordIcon(
                currentPasswordVisibility,
                setCurrentPasswordVisibility,
              )
            }
            inputStyle={localStyles.inputStyle}
          />
          <GInput
            label={strings.newPasswordHeader}
            keyboardType={'default'}
            style={margin.mt30}
            value={newPassword}
            secureTextEntry={newPasswordVisibility}
            toGetTextFieldValue={text =>
              onChangedPassword(text, setNewPassword, setNewPasswordError)
            }
            _errorText={newPasswordError}
            rightIcon={() =>
              PasswordIcon(newPasswordVisibility, setNewPasswordVisibility)
            }
            inputStyle={localStyles.inputStyle}
          />
          <GInput
            label={strings.retypePassword}
            keyboardType={'default'}
            style={margin.mt30}
            value={confirmPassword}
            secureTextEntry={confirmPasswordVisibility}
            toGetTextFieldValue={text =>
              onChangedPassword(
                text,
                setConfirmPassword,
                setConfirmPasswordError,
              )
            }
            _errorText={confirmPasswordError}
            rightIcon={() =>
              PasswordIcon(
                confirmPasswordVisibility,
                setConfirmPasswordVisibility,
              )
            }
            inputStyle={localStyles.inputStyle}
          />
          <GButton
            title={strings.updatePassword}
            textType="b16"
            bgColor={colors.green}
            color={colors.white}
            containerStyle={localStyles.updateBtn}
            onPress={onPressUpdateBtn}
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
    ...styles.pb30,
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
    borderColor: colors.grayScale3,
    borderWidth: moderateScale(1),
    backgroundColor: colors.white,
    borderRadius: moderateScale(7),
  },
  updateBtn: {
    ...styles.center,
    ...styles.mt30,
    ...styles.mh25,
  },
});
