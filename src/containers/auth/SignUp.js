import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PopupModal from '../../components/customComponent.js/PopUp';
import React, { useEffect, useState } from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import { colors, styles } from '../../themes';
import GText from '../../components/common/GText';
import strings from '../../i18n/strings';
import { getHeight, moderateScale } from '../../common/constants';
import GInput from '../../components/common/GInput';
import {
  validateEmail,
  validateName,
  validatePassword,

} from '../../utils/validators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Eye_checked, Eye_icon, Next_Arrow } from '../../assets/svgs';
import GButton from '../../components/common/GButton';
import { StackNav } from '../../navigation/NavigationKeys';
import GKeyBoardAvoidingWrapper from '../../components/common/GKeyBoardAvoidingWrapper';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import postCustomerData from '../../Api/customerOnBoard';

const SignUp = ({ navigation }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [Email, setPhoneNumber] = useState('');
  const [EmailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (
      name.length > 0 &&
      !nameError &&
      Email.length > 0 &&
      password.length > 0 &&
      !EmailError &&
      !passwordError
    ) {
      setIsNextDisabled(false);
    } else {
      setIsNextDisabled(true);
    }
  }, [Email, EmailError, password, passwordError]);

  const onChangedName = val => {
    const { msg } = validateName(val.trim());
    setName(val.trim());
    setNameError(msg);
  };

  const onChangedEmail = val => {
    const { msg } = validateEmail(val.trim());
    setPhoneNumber(val.trim());
    setEmailError(msg);
  };

  const onChangedPassword = val => {
    const { msg } = validatePassword(val.trim());
    setPassword(val.trim());
    setPasswordError(msg);
  };

  const onLoginBtnPressed = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: StackNav.Login }],
    });
  }
  
  const onNextButtonPressed = async () => {
    const auth = getAuth();
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, Email, password);
      const user = userCredential.user;
  
      console.log('Name to be stored:', name);  // Log the name before storing
    // Store the 'name' state directly
      postCustomerData(user, name);
      
      navigation.navigate(StackNav.TabBar);
    } catch (error) {
      setIsModalVisible(true);
      console.log('Error signing up:', error);
    }
  };
  

  const PasswordIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => setPasswordVisibility(!passwordVisibility)}>
        {!passwordVisibility ? <Eye_icon /> : <Eye_checked />}
      </TouchableOpacity>
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GKeyBoardAvoidingWrapper>
        <View style={localStyles.container1}>
          <GText type="b32" align="left" color={colors.appwhite}>
            {strings.welCome}
          </GText>
          <GText type="b32" align="left" color={colors.appyellow}>
            {strings.app_name}
          </GText>
        </View>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={localStyles.container2}>
          <GInput
            label={strings.name}
            value={name}
            keyboardType={'default'}
            style={styles.mt60}
            toGetTextFieldValue={onChangedName}
            _errorText={nameError}
            inputStyle={localStyles.inputStyle}
          />
          <GInput
            label={strings.email_id}
            value={Email}
            keyboardType={'default'}
            style={styles.mt30}
            toGetTextFieldValue={onChangedEmail}
            _errorText={EmailError}
            inputStyle={localStyles.inputStyle}
          />
          <GInput
            label={strings.password}
            value={password}
            keyboardType={'default'}
            style={styles.mt30}
            secureTextEntry={passwordVisibility}
            toGetTextFieldValue={onChangedPassword}
            _errorText={passwordError}
            rightIcon={PasswordIcon}
            inputStyle={localStyles.inputStyle}
          />
          <View style={localStyles.container3}>
            <GText type="b24" color={colors.appwhite}>
              {strings.signUp}
            </GText>
            <GButton
              bgColor={colors.appyellow}
              title={strings.submit}
              containerStyle={[
                localStyles.nextBtn,
                // {
                //   opacity: isNextDisabled ? 0.7 : 1,
                // },
              ]}
              // disabled={isNextDisabled}
              onPress={onNextButtonPressed}
            />
          </View>
          <View style={localStyles.container4}>
            <GText type="m14" color={colors.appwhite} align={'center'}>
              {strings.alReadyAccount}
            </GText>
            <GButton
              title={strings.log_in}
              style={styles.ml10}
              textType="b14"
              color={colors.appyellow}
              onPress={onLoginBtnPressed}
            />
          </View>
        </ScrollView>
        {isModalVisible && (
        <PopupModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} stringToShow={strings.pleaseEnter} />
      )}
      </GKeyBoardAvoidingWrapper>
    </GSafeAreaView>
  );
};

export default SignUp;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.appblack,
  },
  container1: {
    ...styles.selfStart,
    marginLeft: moderateScale(30),
    marginTop: getHeight(75),
  },
  container2: {
    borderWidth: 1,
    borderColor: colors.appyellow,
    ...styles.flex,
    backgroundColor: colors.appblack,
    marginTop: getHeight(45),
    marginHorizontal: moderateScale(16),
    borderRadius: moderateScale(30),
    marginBottom: getHeight(60),
  },
  container3: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.justifyBetween,
    ...styles.mh20,
    ...styles.mt60,
  },
  inputStyle: {
    borderColor: colors.grayScale3,
    borderWidth: moderateScale(1),
    backgroundColor: colors.white,
    borderRadius: moderateScale(7),
  },
  nextBtn: {
    paddingHorizontal: moderateScale(30),
    alignItem: 'center',
    ...styles.center,
  },
  container4: {
    ...styles.flexRow,
    ...styles.center,
    marginTop: getHeight(30),
  },
});