import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  BORDERRADIUS,
  COLOR,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

const InputHeader = (props:any) => {
  const [searchText, setsearchText] = useState<string>('');
  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setsearchText(text)}
        placeholder="Search Movies"
        placeholderTextColor={COLOR.WhiteRGBA32}
        value={searchText}
      />
      <TouchableOpacity style={styles.searchIcon} onPress={() => props.searchFunction(searchText)}>
        <CustomIcon
          name="search"
          size={FONTSIZE.size_20}
          color={COLOR.Orange}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    display: 'flex',
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_24,
    borderWidth: 2,
    borderColor: COLOR.WhiteRGBA15,
    borderRadius: BORDERRADIUS.redius_25,
    flexDirection: 'row',
  },
  textInput: {
    width: '90%',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLOR.White,
  },
  searchIcon:{
    alignItems:'center',
    justifyContent:'center',
    padding:SPACING.space_10
  }
});

export default InputHeader;
