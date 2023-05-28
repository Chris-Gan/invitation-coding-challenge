import React, { ComponentClass, ReactNode } from 'react';
import { toggleColorModeContext } from './ModeContext';

const composeProviders =
    (...providers: any) =>
    ({ children }: { children: ReactNode }) =>
        providers.reduceRight((child: ReactNode, ProvderWrapper: ComponentClass) => <ProvderWrapper>{child}</ProvderWrapper>, children);

const Provider = composeProviders(toggleColorModeContext);

export default Provider;
