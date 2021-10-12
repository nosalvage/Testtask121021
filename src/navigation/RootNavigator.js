import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {EventDetails, Events} from '../screens';

const EventsStack = createStackNavigator();

export const RootNavigator = () => (
  <NavigationContainer>
    <EventsStack.Navigator initialRouteName="Events">
      <EventsStack.Screen name="Events" component={Events} />
      <EventsStack.Screen name="EventDetails" component={EventDetails} />
    </EventsStack.Navigator>
  </NavigationContainer>
);
