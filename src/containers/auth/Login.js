// Library imports
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';

// Local Imports
import GSafeAreaView from '../../components/common/GSafeAreaView';
import { colors, styles } from '../../themes';
import { CartGreen, Eye_checked, Eye_icon, Logo } from '../../assets/svgs';
import { moderateScale } from '../../common/constants';
import strings from '../../i18n/strings';
import GText from '../../components/common/GText';
import margin from '../../themes/margin';
import GInput from '../../components/common/GInput';
import GButton from '../../components/common/GButton';
import { validatePassword, validateEmail } from '../../utils/validators';
import { StackNav } from '../../navigation/NavigationKeys';
import GKeyBoardAvoidingWrapper from '../../components/common/GKeyBoardAvoidingWrapper';
import { useNavigation } from '@react-navigation/native'
import app from '../../Api/firebaseconfig';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import PopupModal from '../../components/customComponent.js/PopUp';

const Login = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { navigate } = useNavigation()
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [Email, setEmail] = useState('');
  const [EmailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);


  useEffect(() => {
    if (
      Email.length > 0 &&
      password.length > 0 &&
      !EmailError &&
      !passwordError
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [Email, EmailError, password, passwordError]);

  const PasswordIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => setPasswordVisibility(!passwordVisibility)}>
        {passwordVisibility ? <Eye_icon /> : <Eye_checked />}
      </TouchableOpacity>
    );
  };

  const onChangedEmail = val => {
    const { msg } = validateEmail(val.trim());
    setEmail(val.trim());
    setEmailError(msg);
  };

  const onChangedPassword = val => {
    const { msg } = validatePassword(val.trim());
    setPassword(val.trim());
    setPasswordError(msg);
  };

  const onLoginBtnPress = () => {
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, Email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("\n\nuser: ",user)
        navigation.navigate(StackNav.TabBar);
     
      })
      .catch((error) => {
        setIsModalVisible(true);
        console.error('Error signing in:', error);
      });

    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: StackNav.TabBar }],
    // });
  };



  const onForgotPassword = () => {
    navigation.navigate(StackNav.ForgotPassword);
  };

  const onSignUpBtnPress = () => {
    navigation.navigate(StackNav.SignUp);
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GKeyBoardAvoidingWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyles.mainContainer}>
          <View style={localStyles.logoContainer}>
            <Image
              source={require('../../assets/images/Logo.png')}
              style={{ width: moderateScale(100), height: moderateScale(100) }}
            />
          </View>
          <GText type="b24" style={margin.mt30} color={colors.appwhite}>
            {strings.welCome}
          </GText>
          <GText type="b24" style={margin.mt5} color={colors.appyellow}>
            {strings.app_name.toUpperCase()}
          </GText>
          <GInput
            label={strings.email_id}
            style={margin.mt60}
            toGetTextFieldValue={onChangedEmail}
            _errorText={EmailError}
            maxLength={30}
          />
          <GInput
            label={strings.password}
            value={password}
            keyboardType={'default'}
            style={margin.mt30}
            secureTextEntry={!passwordVisibility}
            toGetTextFieldValue={onChangedPassword}
            _errorText={passwordError}
            rightIcon={PasswordIcon}
          />
          <GButton
            title={strings.forgotPassword}
            textType="m14"
            color={colors.appwhite}
            containerStyle={localStyles.forgotBtn}
            onPress={onForgotPassword}
          />
          <GButton
            title={strings.login}
            textType="b16"
            bgColor={colors.appyellow}
            color={colors.appblack}
            containerStyle={[
              localStyles.loginBtn,
              // {
              //   opacity: isSubmitDisabled ? 0.7 : 1,
              // },
            ]}
            // disabled={isSubmitDisabled}
            onPress={onLoginBtnPress}
          />
          <View style={localStyles.signupContainer}>
            <GText type="m14" color={colors.appwhite}>
              {strings.noAccount}
            </GText>
            <GButton
              title={strings.signUp}
              textType="b14"
              color={colors.appyellow}
              containerStyle={margin.ml10}
              onPress={onSignUpBtnPress}
            />
          </View>
        </View>
        {isModalVisible && (
        <PopupModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} stringToShow={strings.invalidUser} />
      )}
      </GKeyBoardAvoidingWrapper>
    </GSafeAreaView>
  );
};

export default Login;

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.center,
    ...styles.flex,
    backgroundColor: colors.appblack,
  },
  root: {
    ...styles.flex,
  },
  logoContainer: {
    borderWidth: 1,
    borderColor: 'white',
    ...styles.center,
    ...styles.selfCenter,
    ...styles.p10,
    backgroundColor: colors.appblack,
    borderRadius: moderateScale(100),
    width: moderateScale(120),
    height: moderateScale(120),
  },
  loginBtn: {
    width: moderateScale(356),
  },
  forgotBtn: {
    ...styles.selfEnd,
    marginHorizontal: moderateScale(24),
  },
  signupContainer: {
    ...styles.rowCenter,
  },
});