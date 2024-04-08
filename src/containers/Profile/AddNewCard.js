import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import GHeader from '../../components/common/GHeader';
import strings from '../../i18n/strings';
import {colors, styles} from '../../themes';
import {CreditCard, Switch_off, Switch_on} from '../../assets/svgs';
import {moderateScale} from '../../common/constants';
import GInput from '../../components/common/GInput';
import {getDeviceType} from '../../utils/helpers';
import GButton from '../../components/common/GButton';
import GKeyBoardAvoidingWrapper from '../../components/common/GKeyBoardAvoidingWrapper';
import {
  validateCardNumber,
  validateCvv,
  validateExpiryDate,
  validateName,
} from '../../utils/validators';
import GText from '../../components/common/GText';

export default function AddNewCard({navigation}) {
  const [cardDetails, setCardDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [nameError, setNameError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [isRememberCard, setIsRememberCard] = useState(false);

  const changeIsRememberCardStatus = () => {
    setIsRememberCard(!isRememberCard);
  };

  const onChangeCardName = val => {
    const {msg} = validateName(val.trim());
    setCardDetails({...cardDetails, cardName: val.trim()});
    setNameError(msg);
  };

  const onChangeExpiryDate = text => {
    const {msg} = validateExpiryDate(text.trim());
    setExpiryDateError(msg);
    setCardDetails({...cardDetails, expiryDate: text});
  };

  const onChangeCVV = val => {
    const {msg} = validateCvv(val.trim());
    setCvvError(msg);
    setCardDetails({...cardDetails, cvv: val});
  };

  const onChangeCardNumber = val => {
    const {msg} = validateCardNumber(val.replace(/\s/g, ''));
    setCardNumberError(msg);
    setCardDetails({...cardDetails, cardNumber: val});
  };
  const onPressCheckOut = () => navigation.goBack();

  const handleCardDisplay = () => {
    if (cardDetails?.cardNumber && cardDetails?.cardNumber?.length > 0) {
      const rawText = [...cardDetails?.cardNumber?.split(' ').join('')]; // Remove old space
      const creditCard = []; // Create card as array
      rawText.forEach((t, i) => {
        if (i % 4 === 0 && i !== 0) creditCard.push(' '); // Add space
        creditCard.push(t);
      });
      return creditCard.join('');
    } // Transform card array to string
  };

  const innerInputStyle = () => {
    return getDeviceType() == 2 ? styles.p15 : styles.p10;
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.addNewCard} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={localStyles.bgContainer}>
        <View style={[styles.selfCenter, styles.mt20]}>
          <CreditCard />
        </View>
        <GKeyBoardAvoidingWrapper>
          <View style={[localStyles.cardDetailsView, styles.g15]}>
            <GInput
              value={cardDetails.cardName}
              placeholder={strings.cardNamePlaceholder}
              placeholderTextColor={colors.labelColor}
              label={strings.cardName}
              labelStyle={styles.mh0}
              errorStyle={styles.mh0}
              toGetTextFieldValue={onChangeCardName}
              _errorText={nameError}
              innerInputStyle={innerInputStyle()}
              inputStyle={localStyles.inputStyle}
            />
            <GInput
              placeholder={strings.cardNumberPlaceholder}
              placeholderTextColor={colors.labelColor}
              label={strings.cardNumber}
              labelStyle={styles.mh0}
              maxLength={19}
              inputMode="numeric"
              errorStyle={styles.mh0}
              _errorText={cardNumberError}
              toGetTextFieldValue={onChangeCardNumber}
              value={handleCardDisplay()}
              innerInputStyle={innerInputStyle()}
              inputStyle={localStyles.inputStyle}
            />
            <View style={localStyles.container3}>
              <GInput
                value={cardDetails.expiryDate}
                placeholder={strings.expiryDatePlaceHolder}
                placeholderTextColor={colors.labelColor}
                label={strings.expiryDate}
                style={[{width: '46%'}]}
                labelStyle={styles.mh0}
                maxLength={5}
                inputMode="default"
                errorStyle={styles.mh0}
                _errorText={expiryDateError}
                toGetTextFieldValue={onChangeExpiryDate}
                innerInputStyle={innerInputStyle()}
                inputStyle={localStyles.inputStyle}
              />
              <GInput
                label={strings.cvv}
                value={cardDetails.cvv}
                placeholder={strings.cvvPlaceholder}
                placeholderTextColor={colors.labelColor}
                style={[{width: '46%'}]}
                labelStyle={styles.mh0}
                maxLength={3}
                keyboardType={'decimal-pad'}
                errorStyle={styles.mh0}
                _errorText={cvvError}
                toGetTextFieldValue={onChangeCVV}
                innerInputStyle={innerInputStyle()}
                inputStyle={localStyles.inputStyle}
              />
            </View>
            <View style={localStyles.isRememberContainer}>
              <GText type="m16">{strings.rememberCard}</GText>
              <TouchableOpacity onPress={changeIsRememberCardStatus}>
                {isRememberCard ? (
                  <Switch_on />
                ) : (
                  <Switch_off width={50} height={26} />
                )}
              </TouchableOpacity>
            </View>
            <GButton
              onPress={onPressCheckOut}
              containerStyle={localStyles.checkOutButton}
              title={strings.addCard}
              bgColor={colors.green}
              textType={'b16'}
              color={colors.white}
            />
          </View>
        </GKeyBoardAvoidingWrapper>
      </ScrollView>
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
    ...styles.ph20,
  },
  container: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.pv15,
  },
  otherPaymentContainer: {
    borderWidth: moderateScale(1),
    borderColor: colors.lightGray,
    borderRadius: moderateScale(10),
    ...styles.mt20,
    ...styles.mh20,
    ...styles.p15,
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  iconContainer: {
    backgroundColor: colors.shadow2,
    ...styles.pv10,
    ...styles.ph15,
    borderRadius: moderateScale(10),
  },
  cardDetailsView: {
    ...styles.mh5,
    ...styles.mt20,
    ...styles.p20,
    backgroundColor: colors.white,
    borderRadius: moderateScale(20),
  },
  inputStyle: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.shadow2,
    ...styles.mh0,
  },
  container3: {
    ...styles.flexRow,
    ...styles.justifyBetween,
  },
  isRememberContainer: {
    ...styles.rowSpaceBetween,
    ...styles.pv5,
  },
  checkOutButton: {
    ...styles.mt10,
  },
});
