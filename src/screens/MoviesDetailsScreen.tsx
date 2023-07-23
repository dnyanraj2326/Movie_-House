import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {baseImagePath, movieDetails, moviesCastDetails} from '../api/api';
import {ActivityIndicator} from 'react-native';
import {
  BORDERRADIUS,
  COLOR,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import CategoryHeader from '../components/CategoryHeader';
import CastCard from '../components/CastCard';

const getMoviesDetail = async (movieid: number) => {
  try {
    let response = await fetch(movieDetails(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.log('Something went wrong in getMoviesDetails function', error);
  }
};

const getMoviesCastDetails = async (movieid: number) => {
  try {
    let response = await fetch(moviesCastDetails(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.log('Something went wrong in getMoviesCastDetails function', error);
  }
};
const MoviesDetailsScreen = ({navigation, route}: any) => {
  const [moviesData, setMoviesData] = useState<any>(undefined);
  const [moviesCastData, setMoviesCastData] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const tempMoviesData = await getMoviesDetail(route.params.movieid);
      setMoviesData(tempMoviesData);
    })();
    (async () => {
      const tempCastMovieData = await getMoviesCastDetails(
        route.params.movieid,
      );
      setMoviesCastData(tempCastMovieData?.cast);
    })();
  }, []);

  if (
    moviesData == undefined &&
    moviesData == null &&
    moviesCastData == undefined &&
    moviesCastData == null
  ) {
    return (
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name={'close'}
            header={''}
            action={() => navigation.goBack()}
          />
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
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <StatusBar hidden />
      <View>
        <ImageBackground
          source={{uri: baseImagePath('w780', moviesData?.backdrop_path)}}
          style={styles.imageBG}>
          <LinearGradient
            colors={[COLOR.BlackRGB10, COLOR.Black]}
            style={styles.linearGradients}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name={'close'}
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.imageBG}></View>
        <Image
          source={{uri: baseImagePath('w342', moviesData?.poster_path)}}
          style={styles.cardImg}
        />
      </View>
      <View style={styles.timeContainer}>
        <CustomIcon name="clock" style={styles.clockIcon} />
        <Text style={styles.runtimeText}>
          {Math.floor(moviesData?.runtime / 60)}h{' '}
          {Math.floor(moviesData?.runtime % 60)}m
        </Text>
      </View>
      <View>
        <Text style={styles.title}>{moviesData?.original_title}</Text>
        <View style={styles.genreContainer}>
          {moviesData?.genres?.map((item: any) => {
            return (
              <View style={styles.genresBox} key={item.id}>
                <Text style={styles.genreText}>{item?.name}</Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.taglineText}>{moviesData?.tagline}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
          <CustomIcon name="star" style={styles.starIcon} />
          <Text style={styles.runtimeText}>
            {moviesData?.vote_average?.toFixed(1)} {moviesData?.vote_count}
          </Text>
          <Text style={styles.runtimeText}>
            {moviesData?.release_date?.substring(8, 10)}{' '}
            {new Date(moviesData?.release_date).toLocaleString('default', {
              month: 'long',
            })}{' '}
            {moviesData?.release_date?.substring(0, 4)}
          </Text>
        </View>
        <Text style={styles.discriptionText}>{moviesData?.overview}</Text>
      </View>
      <View style={styles.castContainer}>
              <CategoryHeader title="Top Cast" />
              <FlatList
              data={moviesCastData}
              keyExtractor={(item:any) => item.id}
              horizontal
              contentContainerStyle={styles.containerGap24}
             renderItem={({item,index}) => ( 
             <CastCard 
             shouldMarginatedAtEnd={true}
             cardWidth={80}
             isFirst={index == 0 ? true :false}
             isLast={index == moviesCastData?.length - 1 ? true:false}
             imagepath={baseImagePath('w185',item.profile_path)}
             title={item?.original_name}
             subtitle={item?.character}
             />)}
              />

              <View>
                <TouchableOpacity style={styles.btnBG} activeOpacity={0.7} onPress={() => navigation.push("SeatBooking",{
                  bgImage:baseImagePath('w780',moviesData?.backdrop_path),
                  posterImage:baseImagePath('original',moviesData?.poster_path),
                })}>
                  <Text style={styles.btnText}>Select Seat</Text>
                </TouchableOpacity>
              </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLOR.Black,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradients: {
    height: '100%',
  },
  cardImg: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLOR.WhiteRGBA50,
    marginRight: SPACING.space_8,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_16 - 1,
  },
  runtimeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLOR.White,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLOR.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_14 + 1,
    textAlign: 'center',
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genresBox: {
    borderColor: COLOR.WhiteRGBA50,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.redius_25,
  },
  genreText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLOR.WhiteRGBA75,
  },
  taglineText: {
    fontFamily: FONTFAMILY.poppins_thin,
    fontSize: FONTSIZE.size_14,
    color: COLOR.White,
    fontStyle: 'italic',
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_14 + 1,
    textAlign: 'center',
  },
  infoContainer: {
    marginHorizontal: SPACING.space_24,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLOR.Yellow,
  },
  discriptionText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLOR.White,
  },
  containerGap24:{
    gap:SPACING.space_24
  },
  castContainer:{

  },
  btnBG:{
    alignItems:"center",
    marginVertical:SPACING.space_24,
  },
  btnText:{
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLOR.White,
    paddingHorizontal:SPACING.space_24,
    paddingVertical:SPACING.space_10,
    backgroundColor:COLOR.Orange,
    borderRadius:BORDERRADIUS.redius_25*2

  }
});

export default MoviesDetailsScreen;
