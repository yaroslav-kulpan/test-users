import React, { PropsWithChildren, ReactNode } from "react";

import { table } from "./Table.theme";

type TableProps = {
  paginationControls?: ReactNode | null;
  rightControls?: ReactNode | null;
  emptyState?: ReactNode | null;
  caption?: string | null;
  list: Record<string, any>[];
};

export function Table({
  children,
  list = [],
  caption = null,
  paginationControls = null,
  rightControls = null,
  emptyState = null,
}: PropsWithChildren<TableProps>) {
  const { tableContainer, tableRoot, tableCaption } = table();

  return (
    <>
      <div className="flex items-center justify-between">
        {caption && <h5 className={tableCaption()}>{caption}</h5>}
        <div className="flex justify-end items-center">{rightControls}</div>
      </div>
      <div className={tableContainer()}>
        {list.length > 0 ? (
          <table className={tableRoot()}>{children}</table>
        ) : (
          <div className="h-20 flex justify-center items-center">
            {emptyState}
          </div>
        )}
        {paginationControls && paginationControls}
      </div>
    </>
  );
}

export default Table;
