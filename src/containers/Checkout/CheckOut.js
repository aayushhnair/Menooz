import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import GHeader from '../../components/common/GHeader';
import strings from '../../i18n/strings';
import {colors, styles} from '../../themes';
import GText from '../../components/common/GText';
import GButton from '../../components/common/GButton';
import {Address, paymentMethodList} from '../../Api/constant';
import {moderateScale} from '../../common/constants';
import {
  RadioFilled,
  RadioUnfilled,
  Switch_off,
  Switch_on,
} from '../../assets/svgs';
import GInput from '../../components/common/GInput';
import {
  validateCardNumber,
  validateCvv,
  validateExpiryDate,
  validateName,
} from '../../utils/validators';
import {getDeviceType} from '../../utils/helpers';
import GKeyBoardAvoidingWrapper from '../../components/common/GKeyBoardAvoidingWrapper';
import {StackNav} from '../../navigation/NavigationKeys';

const CheckOut = () => {
  const [addressList, setAddressList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [isRememberCard, setIsRememberCard] = useState(false);
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

  const navigation = useNavigation();

  useEffect(() => {
    getAddressList();
    getPaymentList();
  }, []);
  const getAddressList = async () => {
    let tempAddress = Address.map(item => {
      return {...item, is_selected: false};
    });
    tempAddress[0].is_selected = true;
    setAddressList(tempAddress);
  };
  const getPaymentList = async () => {
    let tempPayment = paymentMethodList.map(item => {
      return {...item, is_selected: false};
    });
    tempPayment[0].is_selected = true;
    setPaymentList(tempPayment);
  };
  const selectAddress = index => {
    let tempAddress = addressList.map(item => {
      return {...item, is_selected: false};
    });
    tempAddress[index].is_selected = true;
    setAddressList(tempAddress);
  };
  const selectPayment = index => {
    let tempPayment = paymentList.map(item => {
      return {...item, is_selected: false};
    });
    tempPayment[index].is_selected = true;
    setPaymentList(tempPayment);
  };

  const changeIsRememberCardStatus = () => {
    setIsRememberCard(!isRememberCard);
  };
  const addressComponent = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => selectAddress(index)}
        style={[
          localStyles.addressView,
          {
            borderColor: item.is_selected ? colors.green : colors.shadow2,
            backgroundColor: item.is_selected
              ? colors.lightGreen2
              : colors.white,
          },
        ]}>
        <View style={localStyles.container}>
          {item.is_selected ? <RadioFilled /> : <RadioUnfilled />}
        </View>
        <View style={localStyles.container2}>
          <GText type={'b14'}>{item.addressName}</GText>
          <GText type={'m14'} color={colors.labelColor}>
            {item.contactNo}
          </GText>
          <GText type={'m14'} color={colors.labelColor}>
            {item.address}
          </GText>
        </View>
      </TouchableOpacity>
    );
  };

  const paymentCard = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => selectPayment(index)}
        style={[
          localStyles.paymentView,
          {
            borderColor: item.is_selected ? colors.green : colors.shadow2,
            backgroundColor: item.is_selected
              ? colors.lightGreen2
              : colors.white,
          },
        ]}>
        <View style={[localStyles.container, localStyles.container2]}>
          {item.paymentMethodIcon}
          <GText type={'m12'}>{item.paymentMethodName}</GText>
        </View>
      </TouchableOpacity>
    );
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
  const onPressPayNow = () => {
    navigation.navigate(StackNav.OrderPage);
  };
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
      <GHeader headerTitle={strings.checkOut} />
      <GKeyBoardAvoidingWrapper>
        <View style={localStyles.addressSection}>
          <View style={localStyles.addressTitle}>
            <GText type={'m16'}>{strings.Select_address}</GText>
            <GButton
              title={strings.add + ' ' + strings.new}
              textType={'b14'}
              color={colors.green}
              containerStyle={localStyles.addNewButton}
            />
          </View>
          <FlatList
            contentContainerStyle={localStyles.contentContainerStyle}
            data={addressList}
            renderItem={addressComponent}
          />
        </View>
        <View style={localStyles.paymentSection}>
          <View style={localStyles.paymentTitle}>
            <GText type={'m16'}>{strings.selectPayment}</GText>
          </View>
          <FlatList
            data={paymentList}
            style={localStyles.paymentList}
            contentContainerStyle={localStyles.contentContainerStyle}
            renderItem={paymentCard}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
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
              placeholder={strings.cvvPlaceholder}
              placeholderTextColor={colors.labelColor}
              label={strings.cvv}
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
        </View>
        <GButton
          onPress={onPressPayNow}
          containerStyle={localStyles.checkOutButton}
          title={strings.payNow}
          bgColor={colors.green}
          textType={'b16'}
          color={colors.white}
        />
      </GKeyBoardAvoidingWrapper>
    </GSafeAreaView>
  );
};

export default CheckOut;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  addressSection: {},
  paymentSection: {},
  paymentTitle: {
    ...styles.mh20,
    ...styles.mt20,
    ...styles.mb10,
  },
  addressTitle: {
    ...styles.rowSpaceBetween,
    ...styles.mh20,
    ...styles.mt25,
  },
  contentContainerStyle: {
    ...styles.g20,
  },
  paymentList: {
    ...styles.mh20,
    ...styles.mt10,
  },
  addressView: {
    ...styles.mh20,
    ...styles.p10,
    borderWidth: 1,
    ...styles.flexRow,
    ...styles.g10,
    borderRadius: moderateScale(8),
  },
  paymentView: {
    width: moderateScale(135),
    height: moderateScale(66),
    borderWidth: 1,
    borderRadius: moderateScale(8),
    ...styles.center,
  },
  container: {
    ...styles.center,
  },
  container2: {
    ...styles.g5,
  },
  addNewButton: {
    height: moderateScale(30),
  },
  cardDetailsView: {
    ...styles.mh20,
    ...styles.mt20,
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
    ...styles.mh20,
    ...styles.mv30,
  },
});
