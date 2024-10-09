import React from 'react';

import { tableBody } from './table.theme';

type TableBodyProps = React.ComponentPropsWithoutRef<'tbody'>;

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.PropsWithChildren<TableBodyProps>
>(function TableBody({ children, className, ...rest }, ref) {
  return (
    <tbody className={tableBody({ className })} ref={ref} {...rest}>
      {children}
    </tbody>
  );
});


export default TableBody;
