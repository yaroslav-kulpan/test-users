import React from "react";

import { tableRow } from "./Table.theme";

type TableRow = React.ComponentPropsWithoutRef<"tr">;

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.PropsWithChildren<TableRow>
>(function TableRow({ children, className }, ref) {
  const { row } = tableRow();
  return (
    <tr className={row({ className })} ref={ref}>
      {children}
    </tr>
  );
});

export default React.memo(TableRow);
