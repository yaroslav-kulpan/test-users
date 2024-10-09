import React from "react";

import { tableHeader, TableHeaderVariants } from "./Table.theme";

type TableHeaderProps = React.ComponentPropsWithoutRef<"thead"> &
  Omit<TableHeaderVariants, "class">;

const { header, row } = tableHeader();

export function TableHeader({
  children,
}: React.PropsWithChildren<TableHeaderProps>) {
  return (
    <thead className={header()}>
      <tr className={row()}>
        {children}
      </tr>
    </thead>
  );
}
