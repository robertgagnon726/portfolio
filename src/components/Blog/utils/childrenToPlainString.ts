import { Children, ReactNode } from 'react';

export function childrenToPlainString(children: ReactNode): string {
  return Children.toArray(children).join('');
}
