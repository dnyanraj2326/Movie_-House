import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {COLOR, SPACING} from '../theme/theme';
import SubMoviesCard from '../components/SubMovieCard';
import {baseImagePath, searchMovies} from '../api/api';
import InputHeader from '../components/InputHeader';

const {width, height} = Dimensions.get('screen');
const SearchScreen = ({navigation}: any) => {
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false)

  const searchMoviesFun = async (name: string) => {

    try {
      setLoading(true)
      let response = await fetch(searchMovies(name));
      let jsonData = await response.json();
      setSearchList(jsonData.results);
      setLoading(false)
    } catch (error) {
      console.log('Somthing went worng in searchMoviesFunction,');
      setLoading(false)
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingSection}>
        <StatusBar hidden />
        <View style={styles.inputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFun} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLOR.Orange} />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
        <FlatList
          data={searchList}
          keyExtractor={(item: any) => item.id}
          bounces={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.inputHeaderContainer}>
              <InputHeader searchFunction={searchMoviesFun} />
            </View>
          }
          contentContainerStyle={styles.centerContainer}
          renderItem={({item, index}) => (
            <SubMoviesCard
              shouldMarginatedAtEnd={false}
              shouldMarginatedAround={true}
              cardFunction={() => {
                navigation.push('MoviesDetail', {movieid: item.id});
              }}
              cardWidth={width / 2 - SPACING.space_12 * 2}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR.Black,
    width: width,
  },
  centerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  inputHeaderContainer: {
    display: 'flex',
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  loadingSection: {
    flex: 1,
    justifyContent:"center",
    alignItems: 'center',
    backgroundColor:COLOR.Black
  },
});

export default SearchScreen;
