import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigationProp, createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Maps from '../screens/Maps';
import { EvilIcons } from '@expo/vector-icons';
import BlurView from 'expo-blur/build/BlurView';
import Login from '../screens/Login';

const Drawer = createDrawerNavigator();

type DrawerNavigation = {
  Home: undefined; //p passar parâmetros de uma página a outra coloco dentro do obj., ex. Home: {name: string; age: number;}
  Detalhes: undefined;
}

export type DrawerTypes = DrawerNavigationProp<DrawerNavigation>;

export default function DrawerComponent() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'black',
          width: 240,
        },
      }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false, drawerActiveBackgroundColor: 'white',
            drawerInactiveBackgroundColor: 'white'
           }}
        />
        <Drawer.Screen
          name="Mapas"
          component={Maps}
          options={{ drawerActiveBackgroundColor: 'white',
            drawerInactiveBackgroundColor: 'white', headerBackground: () => (
              <BlurView tint="light" intensity={100} />
            ),}}
        />
        <Drawer.Screen
          name="Home"
          component={Login}
          options={{ headerShown: false, drawerActiveBackgroundColor: 'white',
            drawerInactiveBackgroundColor: 'white'
           }} />
        <Drawer.Screen
          name="Home"
          component={Login}
          options={{ headerShown: false, drawerActiveBackgroundColor: 'white',
            drawerInactiveBackgroundColor: 'white'
           }} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}