import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConverterScreen from '../screens/ConverterScreen';
import {Currency} from '../types/types';
import CurrencyListScreen from '../screens/CurrencyListScreen';

export type StackDefaultParams = {
  Converter: undefined;
  CurrencyListScreen: {
    onCurrencySelect: (selectedCurrency: Currency) => void | undefined;
  };
};

const StackDefault = createNativeStackNavigator<StackDefaultParams>();

export const Stack = () => {
  return (
    <StackDefault.Navigator initialRouteName="ConverterScreen">
      <StackDefault.Group>
        <StackDefault.Screen
          name={'ConverterScreen'}
          component={ConverterScreen}
          options={{
            headerTitle: 'Home',
          }}
        />
      </StackDefault.Group>
      <StackDefault.Group screenOptions={{presentation: 'modal'}}>
        <StackDefault.Screen
          name="CurrencyListScreen"
          component={CurrencyListScreen}
        />
      </StackDefault.Group>
    </StackDefault.Navigator>
  );
};
