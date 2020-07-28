import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {ShowDetailsInterface} from './src/interfaces/show';
import ShowList from './src/components/ShowList';
import DetailsScreen from './src/components/DetailsScreen';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet} from 'react-native';

const DefaultThemeStyle = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff'
  },
};

export type StackParamList = {
  ShowList: undefined;
  DetailsScreen: ShowDetailsInterface;
};

const Stack = createStackNavigator<StackParamList>();

const App = () => {


  return (
    <SafeAreaView style={styles.container}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer theme={DefaultThemeStyle}>
          <Stack.Navigator initialRouteName="ShowList">
            <Stack.Screen name="ShowList" component={ShowList} />
            <Stack.Screen
              name="DetailsScreen"
              component={DetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});