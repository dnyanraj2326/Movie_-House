import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigators from './src/navigators/TabNavigators';
import MoviesDetailsScreen from './src/screens/MoviesDetailsScreen';
import SeatBookingScreen from './src/screens/SeatBookingScreen';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tab"
          component={TabNavigators}
          options={{animation: 'default'}}
        />
        <Stack.Screen
          name="MoviesDetail"
          component={MoviesDetailsScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="SeatBooking"
          component={SeatBookingScreen}
          options={{animation: 'slide_from_bottom'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
