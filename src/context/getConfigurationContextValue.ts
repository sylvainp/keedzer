import {ConfigContextValueType} from './configurationContextTypes';
import LoginViewmodelFactory from '../presentation/screens/LoginScreen/LoginViewmodel';

const getConfigContextValue = (): ConfigContextValueType => {
  const loginViewmodel = LoginViewmodelFactory();
  return {
    loginViewmodel,
  };
};

export default getConfigContextValue;
