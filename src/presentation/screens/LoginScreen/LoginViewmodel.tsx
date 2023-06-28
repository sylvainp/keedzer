import {useState} from 'react';
import LoginState from './LoginState';
export type LoginViewmodel = {
  //   state: [LoginState, Dispatch<SetStateAction<LoginState>>];
  state: LoginState;
  startLoggingProcess: () => void;
  onUserLogged: (accessToken: string) => void;
  onLoggingError: (error: string) => void;
};

export default function LoginViewmodelFactory(): LoginViewmodel {
  console.log('Hello there !!');
  const [state, setState] = useState<LoginState>({
    isLogging: false,
    error: undefined,
  });
  const startLoggingProcess = () => {
    setState({isLogging: true});
  };

  const onUserLogged = (accessToken: string) => {
    setState({isLogging: false});
    console.log({accessToken});
  };

  const onLoggingError = (error: string) => {
    setState({isLogging: false, error});
  };

  return {state, startLoggingProcess, onUserLogged, onLoggingError};
}
