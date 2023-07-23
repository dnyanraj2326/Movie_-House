import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, StatusBar, ImageBackground, Image} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import AppHeader from '../components/AppHeader';
import {BORDERRADIUS, COLOR, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';

const TicketScreen = ({navigation, route}: any) => {
  const [ticketData, setTicketData] = useState<any>(route.params);
  console.log("ticketData?.seatArray",ticketData?.seatArray)

  useEffect(() => {
    (async () => {
      try {
        const ticket = await EncryptedStorage.getItem('ticket');
        if (ticket !== undefined && ticket !== null) {
          setTicketData(JSON.parse(ticket));
        }
      } catch (error) {
        console.log('SOmthing went wrong while getting data ', error);
      }
    })();
  }, []);
  
  if(ticketData !== route.params && route.params != undefined){
    setTicketData(route.params)
  }

  if (ticketData == undefined && ticketData == null) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header="My Tickets"
            action={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close"
          header="My Tickets"
          action={() => navigation.goBack()}
        />
      </View>
      <View style={styles.ticketContainer}>
        <ImageBackground
          source={{uri: ticketData.ticketImg}}
          style={styles.ticketImgBg}>
          <LinearGradient
            colors={[COLOR.OrangeRGB10, COLOR.Orange]}
            style={styles.linearGradient}>
              <View style={[styles.blackCircle,{position:"absolute",bottom:-40,left:-40}]}></View>
              <View style={[styles.blackCircle,{position:"absolute",bottom:-40,right:-40}]}></View>
            </LinearGradient>
        </ImageBackground>
        <View style={styles.linear}></View>
        <View style={styles.ticketFooter}>
        <View style={[styles.blackCircle,{position:"absolute",top:-40,left:-40}]}></View>
        <View style={[styles.blackCircle,{position:"absolute",top:-40,right:-40}]}></View>
          <View style={styles.ticketDateContainer}>
            <View style={styles.subTitleContainer}>
              <Text style={styles.dateTitle}>{ticketData?.date.date}</Text>
              <Text style={styles.subTitle}>{ticketData?.date.day}</Text>
            </View>
            <View style={styles.subTitleContainer}>
              <CustomIcon name="clock" style={styles.clockIcon} />
              <Text style={styles.subTitle}>{ticketData?.time}</Text>
            </View>
          </View>
          <View style={styles.ticketSeatContainer}>
            <View style={styles.subTitleContainer}>
            <Text style={styles.subHeading}>Hall</Text>
            <Text style={styles.subTitle}>02</Text>
            </View>
            <View style={styles.subTitleContainer}>
            <Text style={styles.subHeading}>Row</Text>
            <Text style={styles.subTitle}>04</Text>
            </View>
            <View style={styles.subTitleContainer}>
            <Text style={styles.subHeading}>Seat</Text>
            <Text style={styles.subTitle}>
              {
              ticketData?.seatArray?.slice(0,3).map((item:any,index:number,arr:any) => {
              return item + (index == arr.length - 1 ? "":", ");
            })
          }
            </Text>
            </View>
          </View>
          <Image source={require('../assets/image/barcode.png')} style={styles.barcodeIcon}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLOR.Black,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_32,
  },
  ticketContainer:{
    flex:1,
    justifyContent:"center",
    marginTop:SPACING.space_20
  },
  ticketImgBg:{
    alignSelf:"center",
    width:300,
    aspectRatio:200/250,
    borderTopLeftRadius:BORDERRADIUS.redius_25,
    borderTopRightRadius:BORDERRADIUS.redius_25,
    overflow:"hidden",
    justifyContent:'flex-end'
  },
  linearGradient:{
    height:'70%'
  },
  linear:{
    borderTopColor:COLOR.Black,
    borderTopWidth:3,
    width:300,
    alignSelf:"center",
    backgroundColor:COLOR.Orange,
    borderStyle:'dashed'
  },
  ticketFooter:{
backgroundColor:COLOR.Orange,
width:300,
alignItems:"center",
paddingBottom:SPACING.space_36,
alignSelf:"center",
borderBottomLeftRadius:BORDERRADIUS.redius_25,
borderBottomRightRadius:BORDERRADIUS.redius_25
  },
  ticketDateContainer:{
    flexDirection:"row",
    gap:SPACING.space_36,
    alignItems:"center",
    justifyContent:"center",
    marginVertical:SPACING.space_10
  },
  dateTitle:{
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_24,
    color:COLOR.White
  },
  subTitle:{
    fontFamily:FONTFAMILY.poppins_regular,
    fontSize:FONTSIZE.size_14,
    color:COLOR.White
  },
  clockIcon:{
    fontSize:FONTSIZE.size_24,
    color:COLOR.White,
    paddingBottom:SPACING.space_10
  },
  ticketSeatContainer:{
    flexDirection:"row",
    gap:SPACING.space_36,
    alignItems:"center",
    justifyContent:"center",
    marginVertical:SPACING.space_10
  },
  subTitleContainer:{
    alignItems:"center"
  },
  subHeading:{
fontFamily:FONTFAMILY.poppins_regular,
  fontSize:FONTSIZE.size_18,
  color:COLOR.White
  },
  barcodeIcon:{
    height:50,
    aspectRatio:158/52
  },
  blackCircle:{
    height:80,
    width:80,
    borderRadius:80,
    backgroundColor:COLOR.Black,
  }
});

export default TicketScreen;
