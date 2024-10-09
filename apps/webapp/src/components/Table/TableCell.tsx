import React, { ComponentPropsWithoutRef } from "react";
import { tableCell } from "./Table.theme";

type TableCellProps = ComponentPropsWithoutRef<"td">;

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.PropsWithChildren<TableCellProps>
>(function TableCell({ children, className, ...props }, ref) {
  return (
    <td ref={ref} className={tableCell({ className })} {...props}>
      {children}
    </td>
  );
});
