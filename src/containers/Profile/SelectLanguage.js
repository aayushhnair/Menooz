import {
  SectionList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// local imports
import {colors, styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import GHeader from '../../components/common/GHeader';
import GKeyBoardAvoidingWrapper from '../../components/common/GKeyBoardAvoidingWrapper';
import GText from '../../components/common/GText';
import {RightArrow} from '../../assets/svgs';
import {languageData} from '../../Api/constant';
import strings from '../../i18n/strings';
import typography from '../../themes/typography';

export default function SelectLanguage() {
  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState('English');
  const [search, setSearch] = useState('');
  const [languageList, setLanguageList] = useState(languageData);

  const onValueChange = value => setSearch(value);

  const onPressItem = item => setIsSelected(item);

  const MyProfileList = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressItem(item?.lnName)}
        style={localStyles.listComponent}>
        <View style={localStyles.detailComponent}>
          <GText type="r16" color={colors.black}>
            {item.lnName}
          </GText>
        </View>
        {isSelected === item.lnName && <RightArrow />}
      </TouchableOpacity>
    );
  };

  const RenderHeader = ({title}) => {
    return (
      <GText
        type="b16"
        color={colors.labelColor}
        style={[styles.mt30, styles.mb10]}>
        {title}
      </GText>
    );
  };

  const RenderSectionHeader = () => {
    return (
      <TextInput
        placeholder={strings.search}
        value={search}
        keyBoardType={'default'}
        autoCapitalize={'none'}
        onChange={onValueChange}
        style={localStyles.inputContainerStyle}
      />
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.setting} />
      <GKeyBoardAvoidingWrapper containerStyle={localStyles.bgContainer}>
        <View style={localStyles.container}>
          <SectionList
            sections={languageList}
            keyExtractor={(item, index) => item + index}
            renderItem={MyProfileList}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={({section: {title}}) => (
              <RenderHeader title={title} />
            )}
            ListHeaderComponent={RenderSectionHeader}
            scrollEnabled={false}
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
    ...styles.ph20,
    ...styles.mv30,
    ...styles.mh20,
    backgroundColor: colors.white,
    borderRadius: moderateScale(20),
  },
  bgContainer: {
    backgroundColor: colors.grayscale2,
    flex: 1,
  },
  list: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(15),
  },
  listComponent: {
    ...styles.rowSpaceBetween,
    ...styles.itemsCenter,
    ...styles.pv15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  detailComponent: {
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  inputContainerStyle: {
    ...styles.mt20,
    borderRadius: moderateScale(9),
    backgroundColor: colors.grayScale1,
    height: moderateScale(45),
    ...styles.ph15,
    fontSize: moderateScale(16),
    color: colors.black,
    ...typography.fontWeights.Regular,
  },
});
