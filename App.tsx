/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  ImageBackground,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TarotCards } from './src/components/TarotCards';
const backgroundImageUri = 'https://static.wixstatic.com/media/98bccd_eee0e3249ea34121a9f18d20cf466672~mv2.jpg/v1/fill/w_640,h_552,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/98bccd_eee0e3249ea34121a9f18d20cf466672~mv2.jpg'
function App(): React.JSX.Element {

  return (
    <GestureHandlerRootView style={{
      flex: 1,
    }}>
      <ImageBackground style={{
        flex: 1,
        
      }}
      resizeMode='cover'
      source={{ uri: backgroundImageUri }}>
        <TarotCards />
      </ImageBackground>
    </GestureHandlerRootView>
  );
}
export default App;
