import {
  SectionList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import strings from '../../i18n/strings';
import GHeader from '../../components/common/GHeader';
import {colors, styles} from '../../themes';
import {helpData} from '../../Api/constant';
import GText from '../../components/common/GText';
import {ArrowNext} from '../../assets/svgs';
import {moderateScale} from '../../common/constants';
import typography from '../../themes/typography';

export default function Help() {
  const [search, setSearch] = React.useState('');

  const onValueChange = value => setSearch(value);

  const RenderItem = ({item}) => {
    return (
      <TouchableOpacity style={localStyles.descContainer}>
        <GText type="r16">{item}</GText>
        <ArrowNext />
      </TouchableOpacity>
    );
  };

  const RenderSectionHeader = ({section}) => {
    return (
      <View>
        <GText type="m18" style={styles.mv20}>
          {section.title}
        </GText>
      </View>
    );
    p;
  };

  const renderHeaderComponent = () => {
    return (
      <View>
        <GText type="m18" style={styles.mv20}>
          {'Hi! How can we help?'}
        </GText>
        <TextInput
          placeholder={strings.search}
          value={search}
          keyBoardType={'default'}
          autoCapitalize={'none'}
          onChange={onValueChange}
          style={localStyles.inputContainerStyle}
        />
      </View>
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.help} />
      <SectionList
        sections={helpData}
        renderItem={RenderItem}
        renderSectionHeader={RenderSectionHeader}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.ph20}
        ListHeaderComponent={renderHeaderComponent}
      />
    </GSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  descContainer: {
    ...styles.pv20,
    ...styles.rowSpaceBetween,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  inputContainerStyle: {
    borderRadius: moderateScale(9),
    backgroundColor: colors.grayScale1,
    height: moderateScale(45),
    ...styles.ph15,
    fontSize: moderateScale(16),
    color: colors.black,
    ...typography.fontWeights.Regular,
  },
});
