import React, { useState,useContext } from 'react';
import { BallInterface, ContextInterface} from '../interfaces';

export const Context = React.createContext<ContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

export const useContextHelper = () => {
  return useContext(Context) as ContextInterface;
};

const ContextProvider: React.FC<Props> = ({ children }) => {

  const [coordinates, setCoordinates] = useState<BallInterface[]>([]);
  const [uri, setUri] = useState<string>('');

  return (
    <Context.Provider value={{
      coordinates: coordinates,
      setCoordinates: setCoordinates,
      uri: uri,
      setUri:setUri,
    }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
