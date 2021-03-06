import React, {useState, useEffect} from 'react';
import { NavigationContainer }  from '@react-navigation/native';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import themeChanger from './src/components/settings/themeChanger';



export default function App() {
  const theme = themeChanger();

  return (
      <NavigationContainer theme={theme}>
          <DrawerNavigation/>
      </NavigationContainer>
  );
}

