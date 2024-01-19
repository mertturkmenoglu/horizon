import React from 'react';

export type TPageContextState = {};

export const defaultValues: TPageContextState = {};

export const PageContext = React.createContext(defaultValues);
