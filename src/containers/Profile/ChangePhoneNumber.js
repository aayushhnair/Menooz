import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// local imports
import {colors, styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import GHeader from '../../components/common/GHeader';
import GKeyBoardAvoidingWrapper from '../../components/common/GKeyBoardAvoidingWrapper';
import GInput from '../../components/common/GInput';
import margin from '../../themes/margin';
import strings from '../../i18n/strings';
import {validatePhoneNumber} from '../../utils/validators';
import GButton from '../../components/common/GButton';

export default function ChangePhoneNumber() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [reTypePhoneNumber, setReTypePhoneNumber] = useState('');
  const [reTypePhoneNumberError, setReTypePhoneNumberError] = useState('');

  const onChangePhoneNo = (val, setValue, setError) => {
    const {msg} = validatePhoneNumber(val.trim());
    setValue(val.trim());
    setError(msg);
  };

  const onPressUpdateBtn = () => navigation.goBack();

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.changePhoneNumber} />
      <GKeyBoardAvoidingWrapper containerStyle={localStyles.bgContainer}>
        <View style={localStyles.container}>
          <GInput
            label={strings.newPhoneNumber}
            keyboardType={'phone-pad'}
            style={margin.mt30}
            toGetTextFieldValue={txt =>
              onChangePhoneNo(txt, setPhoneNumber, setPhoneNumberError)
            }
            _errorText={phoneNumberError}
            inputStyle={localStyles.inputStyle}
            maxLength={10}
            value={phoneNumber}
          />
          <GInput
            label={strings.reTypePhoneNumber}
            keyboardType={'phone-pad'}
            style={margin.mt30}
            toGetTextFieldValue={txt =>
              onChangePhoneNo(
                txt,
                setReTypePhoneNumber,
                setReTypePhoneNumberError,
              )
            }
            _errorText={reTypePhoneNumberError}
            inputStyle={localStyles.inputStyle}
            maxLength={10}
            value={reTypePhoneNumber}
          />

          <GButton
            title={strings.updatePhoneNumber}
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
