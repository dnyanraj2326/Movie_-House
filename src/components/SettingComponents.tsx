import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLOR, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';


const SettingComponents = (props:any) => {
  return (
    <View style={styles.container}>
      <View>
        <CustomIcon name={props.icon} style={styles.iconStyle} />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{props.heading}</Text>
        <Text style={styles.subTitle}>{props.subHeading}</Text>
        <Text style={styles.subTitle}>{props.subTitle}</Text>
      </View>
      <View style={styles.iconBG}>
        <CustomIcon name="arrow-right" style={styles.iconStyle} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        paddingVertical:SPACING.space_20,
    },
    settingContainer:{
        flex:1
    },
    iconStyle:{
        color:COLOR.White,
        fontSize: FONTSIZE.size_24,
        paddingHorizontal:SPACING.space_20
    },
    title:{
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLOR.White,
    },
    subTitle:{
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLOR.WhiteRGBA32,
    },
    iconBG:{
        justifyContent:"center",
    }
});

export default SettingComponents;