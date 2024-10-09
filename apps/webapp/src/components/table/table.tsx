import React, { PropsWithChildren, ReactNode } from "react";

import { TableProvider } from "./context/table.context";
import { TableBody } from "./table-body";
import { TableCell } from "./table-cell";
import { TableColumn } from "./table-column";
import { TableHeader } from "./table-header";
import { TableRow } from "./table-row";
import { table } from "./table.theme";

type TableProps = {
  selectionMode?: string;
  paginationControls?: ReactNode | null;
  rightControls?: ReactNode | null;
  emptyState?: ReactNode | null;
  defaultSelectedKeys?: string[];
  caption?: string | null;
  list: Record<string, any>[];
};

export function Table({
  children,
  defaultSelectedKeys,
  selectionMode,
  list = [],
  caption = null,
  paginationControls = null,
  rightControls = null,
  emptyState = null,
}: PropsWithChildren<TableProps>) {
  const { tableContainer, tableRoot, tableCaption } = table();

  return (
    <TableProvider
      defaultSelectedKeys={defaultSelectedKeys}
      selectionMode={selectionMode}
      list={list}
    >
      <div className="flex items-center justify-between">
        {caption && <h5 className={tableCaption()}>{caption}</h5>}
        <div className="flex justify-end items-center">{rightControls}</div>
      </div>
      <div className={tableContainer()}>
        {list.length > 0 ? (
          <table className={tableRoot()}>{children}</table>
        ) : (
          <div className="h-20 flex justify-center items-center">{emptyState}</div>
        )}
        {paginationControls && paginationControls}
      </div>
    </TableProvider>
  );
}

Table.TableBody = TableBody;
Table.TableCell = TableCell;
Table.TableColumn = TableColumn;
Table.TableHeader = TableHeader;
Table.TableRow = TableRow;

export default Table;
