import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CatsScreen from '../screens/CatsScreen';
import AnimationOptionScreen from '../screens/AnimationOptionScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SelectAnimationScreen"
          component={AnimationOptionScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AnimationScreen" component={CatsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
