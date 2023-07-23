import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {COLOR, SPACING} from '../theme/theme';
import {
  upcomingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImagePath,
} from '../api/api';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMoviesCard from '../components/SubMovieCard';
import MoviesCard from '../components/MoviesCard';

const {width, height} = Dimensions.get('window');

const getNowPlayingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.log(
      'Somthing went worng in getNowPlayingMoviesList function',
      error,
    );
  }
};

const getUpcommingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.log(
      'Somthing went worng in getUpcommingMoviesList function',
      error,
    );
  }
};

const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.log('Somthing went worng in getPopularMoviesList function', error);
  }
};

const HomeScreen = ({navigation}: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] =
    useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcommingMoviesList] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      let tepmNowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList([
        {id: 'Dummy1'},
        ...tepmNowPlaying.results,
        {id: 'Dummy2'},
      ]);
    })();

    (async () => {
      let tempUpcomming = await getUpcommingMoviesList();
      setUpcommingMoviesList(tempUpcomming.results);
    })();

    (async () => {
      let tempPopular = await getPopularMoviesList();
      setPopularMoviesList(tempPopular.results);
    })();
  }, []);

  const searchFunction = () => {
    navigation.navigate('Search');
  };

  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upcomingMoviesList == undefined &&
    upcomingMoviesList == null
  ) {
    return (
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
        style={styles.container}>
        <StatusBar hidden />
        <View style={styles.inputHeaderContainer}>
          <InputHeader searchFunction={searchFunction} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLOR.Orange} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <StatusBar hidden={true}/>
      <View style={styles.inputHeaderContainer}>
        <InputHeader searchFunction={searchFunction} />
      </View>
      <CategoryHeader title={'Now Playing'} />
      <FlatList
        data={nowPlayingMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        bounces={false}
        snapToInterval={width * 0.7 + SPACING.space_36}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => {
          if (!item.original_title) {
            return (
              <View
                style={{
                  width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                }}></View>
            );
          }
          return (
            <MoviesCard
              shouldMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MoviesDetail', {movieid: item?.id});
              }}
              cardWidth={width * 0.7}
              isFirst={index == 0 ? true : false}
              isLast={index == upcomingMoviesList?.length - 1 ? true : false}
              title={item?.original_title}
              imagePath={baseImagePath('w780', item?.poster_path)}
              genre={item?.genre_ids?.slice(1, 4)}
              vote_average={item?.vote_average}
              vote_count={item?.vote_count}
            />
          );
        }}
      />
      <CategoryHeader title={'Popular'} />
      <FlatList
        data={popularMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMoviesCard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MoviesDetail', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList?.length - 1 ? true : false}
            title={item?.original_title}
            imagePath={baseImagePath('w342', item?.poster_path)}
          />
        )}
      />
      <CategoryHeader title={'Upcomming'} />
      <FlatList
        data={upcomingMoviesList}
        keyExtractor={(item: any) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMoviesCard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MoviesDetail', {movieId: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLOR.Black,
  },
  scrollViewContainer: {
    // flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});

export default HomeScreen;
