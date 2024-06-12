import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigationProp, createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Details from '../screens/Details';

const Drawer = createDrawerNavigator();

type DrawerNavigation = {
  Home: undefined; //p passar parâmetros de uma página a outra coloco dentro do obj., ex. Home: {name: string; age: number;}
  Detalhes: undefined;
}

export type DrawerTypes = DrawerNavigationProp<DrawerNavigation>;

export default function DrawerComponent() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Detalhes" component={Details}/>
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}