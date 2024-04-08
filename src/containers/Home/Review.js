import {FlatList, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import {colors, styles} from '../../themes';
import images from '../../assets/images';
import {moderateScale} from '../../common/constants';
import GHeader from '../../components/common/GHeader';
import strings from '../../i18n/strings';
import GText from '../../components/common/GText';
import * as Progress from 'react-native-progress';
import ReviewUserComponent from '../../components/customComponent.js/ReviewUserComponent';
import {reviewsData} from '../../Api/constant';
import {FlashList} from '@shopify/flash-list';

export default function Review() {
  const [rating, setRating] = React.useState('');

  const progressData = [
    {
      id: 1,
      title: '5 Star',
      progress: 0.5,
      user: 20,
    },
    {
      id: 2,
      title: '4 Star',
      progress: 0.3,
      user: 45,
    },
    {
      id: 3,
      title: '3 Star',
      progress: 0.2,
      user: 5,
    },
    {
      id: 4,
      title: '2 Star',
      progress: 0.1,
      user: 68,
    },
    {
      id: 5,
      title: '1 Star',
      progress: 0.1,
      user: 7,
    },
  ];

  const renderStar = ({item, index}) => {
    return (
      <View style={{marginHorizontal: moderateScale(2)}}>
        <Image
          source={rating < index ? images.emptyStar : images.fillStar}
          style={localStyles.starContainer}
        />
      </View>
    );
  };

  const RenderFlashListItem = ({item, index}) => {
    return <ReviewUserComponent item={item} />;
  };

  const ListFlashListHeader = () => {
    return (
      <View style={localStyles.reviewContainer}>
        <View style={styles.mr10}>
          <View style={localStyles.ratingContainer}>
            <GText type="m22" align={'center'} color={colors.white}>
              {'4.8'}
            </GText>
          </View>
          <GText
            type="m14"
            align={'center'}
            style={styles.mv10}
            color={colors.black}>
            {'320 reviews'}
          </GText>
          <FlatList
            data={[1, 2, 3, 4, 5]}
            renderItem={renderStar}
            keyExtractor={item => item.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          {progressData.map((item, index) => (
            <View key={index} style={[styles.rowSpaceBetween, styles.mv5]}>
              <GText type={'r16'} color={colors.black} style={styles.mr10}>
                {item.title}
              </GText>
              <Progress.Bar
                progress={item.progress}
                width={moderateScale(150)}
                color={colors.green}
                unfilledColor={colors.grayscale2}
                borderColor="transparent"
                borderRadius={moderateScale(30)}
              />
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.review} />
      <FlashList
        data={reviewsData}
        renderItem={RenderFlashListItem}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={10}
        contentContainerStyle={styles.ph20}
        ListHeaderComponent={<ListFlashListHeader />}
        showsVerticalScrollIndicator={false}
      />
    </GSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    ...styles.flex,
  },
  starContainer: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  reviewContainer: {
    ...styles.mt25,
    ...styles.rowSpaceBetween,
  },
  ratingContainer: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: colors.green,
    ...styles.center,
    ...styles.selfCenter,
  },
});
