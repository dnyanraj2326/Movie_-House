import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, Image,ScrollView} from 'react-native';
import {COLOR, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponents from '../components/SettingComponents';

const UserAccountScreen = ({navigation}: any) => {
  return (
    <ScrollView
    bounces={false}
    showsVerticalScrollIndicator={false}
     style={styles.container}>
      <View style={styles.appHeaderContainer}>
        <StatusBar hidden />
        <AppHeader
          name="close"
          header="My Profile"
          action={() => navigation.goBack()}
        />
      </View>
      <View style={[styles.profileContainer,{marginTop:SPACING.space_10}]}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
          }}
          style={styles.avatarImg}
        />
        <Text style={styles.avatarText}>John Doe</Text>
      </View>
      <View style={styles.profileContainer}></View>
      <SettingComponents
        icon="user"
        heading="Account"
        subHeading="Edit Profile"
        subTitle="Change Password"
      />
       <SettingComponents
        icon="setting"
        heading="Settings"
        subHeading="Themes"
        subTitle="Permissions"
      />
       <SettingComponents
        icon="doller"
        heading="Offers & Refferrals"
        subHeading="Offer"
        subTitle="Refferrals"
      />
      <SettingComponents
        icon="info"
        heading="About"
        subHeading="About Movies"
        subTitle="More"
      />
    </ScrollView>
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
    marginTop: SPACING.space_20 * 2,
  },
  profileContainer: {
    alignItems: 'center',
    padding: SPACING.space_24,
  },
  avatarImg: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  avatarText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    marginTop: SPACING.space_16,
    color: COLOR.White,
  },
});

export default UserAccountScreen;
