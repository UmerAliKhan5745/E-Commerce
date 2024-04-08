"use client"
import React, { ReactNode } from 'react';
import  store  from './store';
import { Provider } from 'react-redux';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }: ProvidersProps) => {
  return (
    <>
    <Provider store={store}>
      {children}
    </Provider>
    
    </>
  );
};

export default Providers;
