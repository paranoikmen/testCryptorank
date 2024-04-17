import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Stack} from './navigation/Stack';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
}

export default App;
