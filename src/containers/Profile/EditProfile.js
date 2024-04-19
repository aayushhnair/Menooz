import {StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';

// custom imports
import GSafeAreaView from '../../components/common/GSafeAreaView';
import GKeyBoardAvoidingWrapper from '../../components/common/GKeyBoardAvoidingWrapper';
import GInput from '../../components/common/GInput';
import strings from '../../i18n/strings';
import {colors, styles} from '../../themes';
import GButton from '../../components/common/GButton';
import {moderateScale} from '../../common/constants';
import GHeader from '../../components/common/GHeader';
import postCustomerData, { editCustomerData } from '../../Api/customerOnBoard';
import { AuthContext } from '../../Api/Authentication';
import PopupModal from '../../components/customComponent.js/PopUp';

export default function EditProfile({navigation}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const {user} = useContext(AuthContext);

  const onChangeFullName = text => {
    setFullName(text)
    
  };
  const onChangePhoneNumber = text => {
    setPhoneNumber(text)
    
  };
  const onChangeGender = text => {
    setGender(text)
    
  };


  const onPressSave = () => {
    // Check if all values are provided
    if (!fullName || !phoneNumber || !gender) {
        // Show an error message or alert to the user
        setIsModalVisible(true);
        return;
    }

    editCustomerData(user.uid, 'name', fullName);
    editCustomerData(user.uid, 'phoneNumber', phoneNumber);
    editCustomerData(user.uid, 'gender', gender);
    
    navigation.goBack();
};

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.profile} />
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
            keyboardType={'phone-pad'}
            labelStyle={localStyles.labelStyle}
            errorStyle={styles.mh0}
            toGetTextFieldValue={onChangePhoneNumber}
            innerInputStyle={styles.p15}
            inputStyle={localStyles.inputStyle}
          />
          <GInput
            placeholder={strings.selectGender}
            placeholderTextColor={colors.labelColor}
            label={strings.gender}
            value={gender}
            labelStyle={localStyles.labelStyle}
            errorStyle={styles.mh0}
            toGetTextFieldValue={onChangeGender}
            inputStyle={localStyles.inputStyle}
          />
          {/* <GInput
            placeholder={strings.enterBirthday}
            placeholderTextColor={colors.labelColor}
            label={strings.birthday}
            value={birthday}
            labelStyle={localStyles.labelStyle}
            errorStyle={styles.mh0}
            toGetTextFieldValue={onChangeBirthday}
            inputStyle={localStyles.inputStyle}
          />
          <GInput
            placeholder={strings.enterPassword}
            placeholderTextColor={colors.labelColor}
            label={strings.password}
            value={password}
            labelStyle={localStyles.labelStyle}
            errorStyle={styles.mh0}
            toGetTextFieldValue={onChangePassword}
            inputStyle={localStyles.inputStyle}
          /> */}

          <GButton
            onPress={onPressSave}
            containerStyle={localStyles.checkOutButton}
            title={strings.save}
            bgColor={colors.appyellow}
            textType={'b16'}
            color={colors.white}
          />
          {isModalVisible && (
        <PopupModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} stringToShow={strings.enterAllFieldes} />
      )}
        </View>
      </GKeyBoardAvoidingWrapper>
    </GSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.appblack,
  },
  container: {
    ...styles.p20,
    ...styles.mv30,
    ...styles.mh20,
    backgroundColor: colors.white,
    borderRadius: moderateScale(20),
  },
  bgContainer: {
    backgroundColor: colors.appblack,
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
