import React from 'react';
import { type FretboardContextValue } from './index';

export const FretboardContext = React.createContext<FretboardContextValue>({ m4l: false });

