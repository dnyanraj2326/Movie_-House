import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {
  BORDERRADIUS,
  COLOR,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import CustomIcon from '../components/CustomIcon';
import EncryptedStorage from 'react-native-encrypted-storage';

const timeArray: string[] = [
  '10.30',
  '12.30',
  '14.30',
  '15.00',
  '19.30',
  '21.00',
];

const generateDate = () => {
  const date = new Date();
  let weekday: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

const generateSeats = () => {
  let numRow = 8;
  let numColumn = 3;
  let rowArr = [];
  let start = 1;
  let reachnine = false;

  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObj = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObj);
      start++;
    }
    if (i == 3) {
      numColumn += 2;
    }
    if (numColumn < 9 && !reachnine) {
      numColumn += 2;
    } else {
      reachnine = true;
      numColumn -= 2;
    }
    rowArr.push(columnArray);
  }
  return rowArr;
};

const SeatBookingScreen = ({route, navigation}: any) => {
  const [dateArray, setDateArray] = useState<any>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndeS, setselectedTimeIndeS] = useState<any>();
  // console.log(JSON.stringify(generateSeats(), null, 2));
  const selectSeatFun = (ind: number, subind: number, num: number) => {
    if (!twoDSeatArray[ind][subind].taken) {
      let array: any = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[ind][subind].selected = !temp[ind][subind].selected;
      if (!array.includes(num)) {
        array.push(num);
        setSelectedSeatArray(array);
      } else {
        const tempIndex = array.indexOf(num);
        if (tempIndex > -1) {
          array.splice(tempIndex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 5.0);
      setTwoDSeatArray(temp);
    }
  };

  const BookSeatsFun = async () => {
    if (
      selectedSeatArray.length !== 0 &&
      timeArray[selectedTimeIndeS] != undefined &&
      dateArray[selectedDateIndex] !== undefined
    ) {
      try {
        await EncryptedStorage.setItem(
          'ticket',
          JSON.stringify({
            seatArray: selectedSeatArray,
            time: timeArray[selectedTimeIndeS],
            date: dateArray[selectedDateIndex],
            ticketImg: route.params.posterImage,
          }),
        );
      } catch (error) {
        console.log('Somthing went wrong in BookSeats Functions.', error);
      }
      navigation.navigate("Ticket",{
        seatArray: selectedSeatArray,
        time: timeArray[selectedTimeIndeS],
        date: dateArray[selectedDateIndex],
        ticketImg: route.params.posterImage,
      });
    }else{
      ToastAndroid.showWithGravity(
        'Please select seats, Date and Time of the Show',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      )
    }
  };
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <StatusBar hidden />
      <View>
        <ImageBackground
          source={{uri: route.params.bgImage}}
          style={styles.imgBG}>
          <LinearGradient
            colors={[COLOR.BlackRGB10, COLOR.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name={'close'}
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.screenText}>Screen this side</Text>
        <View style={styles.seatContainer}>
          <View style={styles.containerGap20}>
            {twoDSeatArray?.map((item, ind) => {
              return (
                <View key={ind} style={styles.seatRow}>
                  {item?.map((subItem, subind) => {
                    return (
                      <TouchableOpacity
                        key={subItem.number}
                        onPress={() => {
                          selectSeatFun(ind, subind, subItem.number);
                        }}>
                        <CustomIcon
                          name="seat"
                          style={[
                            styles.seatIcon,
                            subItem.taken ? {color: COLOR.WhiteRGBA50} : {},
                            subItem.selected ? {color: COLOR.Orange} : {},
                          ]}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </View>
          <View style={styles.seatRedioContainer}>
            <View style={styles.radioContainer}>
              <CustomIcon
                name="radio"
                style={[styles.radioIcon, {color: COLOR.White}]}
              />
              <Text style={styles.radioText}>Available</Text>
            </View>
            <View style={styles.radioContainer}>
              <CustomIcon
                name="radio"
                style={[styles.radioIcon, {color: COLOR.WhiteRGBA50}]}
              />
              <Text style={styles.radioText}>Taken</Text>
            </View>
            <View style={styles.radioContainer}>
              <CustomIcon
                name="radio"
                style={[styles.radioIcon, {color: COLOR.Orange}]}
              />
              <Text style={styles.radioText}>Selected</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <FlatList
          data={dateArray}
          keyExtractor={item => item.id}
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({item, index}: any) => {
            return (
              <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
                <View
                  style={[
                    styles.dateContainer,
                    index == 0
                      ? {marginLeft: SPACING.space_24}
                      : index == dateArray.length - 1
                      ? {marginRight: SPACING.space_24}
                      : {},
                    index == selectedDateIndex
                      ? {backgroundColor: COLOR.Orange}
                      : {},
                  ]}>
                  <Text style={styles.dateText}>{item?.date}</Text>
                  <Text style={styles.dayText}>{item?.day}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.outerContainer}>
        <FlatList
          data={timeArray}
          keyExtractor={item => item}
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({item, index}: any) => {
            return (
              <TouchableOpacity onPress={() => setselectedTimeIndeS(index)}>
                <View
                  style={[
                    styles.timeContainer,
                    index == 0
                      ? {marginLeft: SPACING.space_24}
                      : index == dateArray.length - 1
                      ? {marginRight: SPACING.space_24}
                      : {},
                    index == selectedTimeIndeS
                      ? {backgroundColor: COLOR.Orange}
                      : {},
                  ]}>
                  <Text style={styles.timeText}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.btnPriceContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.priceText}>$ {price}</Text>
        </View>
        <TouchableOpacity onPress={() => BookSeatsFun()}>
          <Text style={styles.btnText}>Buy Ticket</Text>
        </TouchableOpacity>
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
  imgBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  screenText: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLOR.WhiteRGBA15,
  },
  seatContainer: {
    marginVertical: SPACING.space_20,
  },
  containerGap20: {
    gap: SPACING.space_20,
  },
  seatRow: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    justifyContent: 'center',
  },
  seatIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLOR.White,
  },
  seatRedioContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: SPACING.space_36,
    alignItems: 'center',
    marginBottom: SPACING.space_10,
  },
  radioContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  radioIcon: {
    textAlign: 'center',
    fontSize: FONTSIZE.size_20,
  },
  radioText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLOR.White,
    textAlign: 'center',
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  dateContainer: {
    width: SPACING.space_10 * 7,
    height: SPACING.space_10 * 10,
    borderRadius: BORDERRADIUS.redius_10 * 10,
    backgroundColor: COLOR.DarkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLOR.White,
  },
  dayText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLOR.White,
  },
  timeContainer: {
    paddingVertical: SPACING.space_10,
    borderWidth: 1,
    borderColor: COLOR.WhiteRGBA50,
    paddingHorizontal: SPACING.space_20,
    borderRadius: BORDERRADIUS.redius_25,
    backgroundColor: COLOR.DarkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLOR.White,
  },
  outerContainer: {
    marginVertical: SPACING.space_24,
  },
  btnPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLOR.WhiteRGBA50,
  },
  priceText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLOR.White,
  },
  btnText: {
    borderRadius: BORDERRADIUS.redius_25,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLOR.White,
    backgroundColor: COLOR.Orange,
  },
});

export default SeatBookingScreen;
