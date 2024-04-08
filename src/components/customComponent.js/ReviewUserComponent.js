import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

//custom components
import {Heart, HeartFilled, ReplyIcon} from '../../assets/svgs';
import GText from '../common/GText';
import {styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import images from '../../assets/images';

export default function ReviewUserComponent(props) {
  const {item} = props;
  const [isLiked, setIsLiked] = useState(false);

  const onPressLike = () => setIsLiked(!isLiked);

  const renderStar = ({item, index}) => {
    return (
      <View style={{marginHorizontal: moderateScale(2)}}>
        <Image
          source={4 < index ? images.emptyStar : images.fillStar}
          style={localStyles.starContainer}
        />
      </View>
    );
  };

  return (
    <View style={styles.mv20}>
      <View style={localStyles.userContainer}>
        <View style={[styles.flexRow, styles.flex, styles.itemsCenter]}>
          <Image
            source={{uri: item?.image}}
            style={localStyles.userImageStyle}
          />
          <GText numberOfLines={1} style={styles.flex} type={'b16'}>
            {item?.name}
          </GText>
        </View>
        <View style={[styles.flexRow, styles.itemsCenter]}>
          <GText type={'m14'}>{item?.time}</GText>
        </View>
      </View>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={renderStar}
        keyExtractor={item => item.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mv5}
      />
      <GText type={'r14'} style={styles.mt5}>
        {item?.review}
      </GText>
      <View style={localStyles.bottomContainer}>
        <TouchableOpacity onPress={onPressLike}>
          {isLiked ? <HeartFilled /> : <Heart />}
        </TouchableOpacity>
        <GText type={'r12'} style={styles.mh5}>
          {item?.like}
        </GText>
        <TouchableOpacity style={styles.ml15}>
          {<ReplyIcon height={moderateScale(22)} width={moderateScale(22)} />}
        </TouchableOpacity>
        <GText type={'r12'} style={styles.mh5}>
          {'Reply'}
        </GText>
      </View>
    </View>
  );
}
const localStyles = StyleSheet.create({
  userImageStyle: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    ...styles.mr10,
  },
  userContainer: {
    ...styles.rowSpaceBetween,
  },
  chipsContainer: {
    ...styles.ph15,
    ...styles.pv5,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(25),
    ...styles.mh10,
    ...styles.rowCenter,
  },
  starStyle: {
    width: moderateScale(12),
    height: moderateScale(12),
    resizeMode: 'contain',
    ...styles.mr10,
  },
  bottomContainer: {
    ...styles.mt5,
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  starContainer: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
});
