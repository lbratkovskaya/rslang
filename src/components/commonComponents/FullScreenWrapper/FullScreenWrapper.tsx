import React from 'react';
import { FullScreen } from 'react-full-screen';
import { IFullScreenWrapperProps } from '../types';

const FullScreenWrapper: React.FC<IFullScreenWrapperProps> = (props: IFullScreenWrapperProps) => {
  return <FullScreen handle={props.handle}>{props.component}</FullScreen>;
};

export default FullScreenWrapper;
