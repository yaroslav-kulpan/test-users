import React, { useMemo } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

import Table from "../../components/table/table";
import TablePagination from "../../components/TablePagination/TablePagination";
import {
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "../../components/table";
import { humanizeDate } from "../../utils/humanize-date";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { User, UsersListResponse } from "../../types/users.interface";
import Button from "../../components/Button";
import { FullScreenLoader } from "../../components/FullScreenLoader";

type UsersTableProps = {
  users: User[];
  total: number;
  isLoading: boolean;
  error: any;
  isTableLoading: boolean;
  handleCreate: () => void;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  refetch: () => Promise<UsersListResponse>;
  handleEdit: (id: number) => () => Promise<void>;
  handleDelete: (id: number) => () => Promise<void>;
};

const COLUMNS: string[] = [
  "id",
  "Email",
  "First name",
  "Last name",
  "Age",
  "Gender",
  "Height",
  "Weight",
  "Created at",
  "Updated at",
  "Actions",
];

export function UsersTable({
  error,
  handleCreate,
  handleDelete,
  handleEdit,
  isLoading,
  isTableLoading,
  total,
  users,
  refetch,
  handleNextPage,
  handlePrevPage,
}: UsersTableProps) {
  const rows = useMemo(() => {
    return users?.map((user) => (
      <TableRow className="group" key={user.id} rowKey={user}>
        <TableCell>{user?.id}</TableCell>
        <TableCell>{user?.email}</TableCell>
        <TableCell>{user?.first_name}</TableCell>
        <TableCell>{user?.last_name}</TableCell>
        <TableCell>{user?.profile?.age}</TableCell>
        <TableCell>{user?.profile?.gender}</TableCell>
        <TableCell>{user?.profile?.height}</TableCell>
        <TableCell>{user?.profile?.weight}</TableCell>
        <TableCell>{humanizeDate(user.createdAt)}</TableCell>
        <TableCell>{humanizeDate(user.updatedAt)}</TableCell>
        <TableCell className="flex gap-x-3 justify-end" align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleEdit(user.id)}
          >
            <PencilIcon className="h-4 w-4 text-white" />
          </Button>
          <Button
            variant="contained"
            color="danger"
            onClick={handleDelete(user.id)}
          >
            <TrashIcon className="h-4 w-4 text-white" />
          </Button>
        </TableCell>
      </TableRow>
    ));
  }, [users, handleEdit, handleDelete]);

  return error ? (
    <>Oh no, there was an error</>
  ) : isLoading ? (
    <FullScreenLoader />
  ) : users ? (
    <>
      {isTableLoading && <FullScreenLoader />}
      <Table
        list={users}
        caption="Users"
        rightControls={
          <div className="flex gap-x-3">
            <Button variant="outlined" color="primary" onClick={refetch}>
              <ArrowPathIcon className="h-4 w-5" />
            </Button>
            <Button onClick={handleCreate}>Add new User</Button>
          </div>
        }
        paginationControls={
          <TablePagination
            handleNext={handleNextPage}
            handlePrevious={handlePrevPage}
            total={total}
            limit={users.length}
          />
        }
        emptyState={
          <div className="text-center">
            <p className="mb-4 text-lg text-gray-600">No users found</p>
          </div>
        }
      >
        <TableHeader>
          {COLUMNS.map((tablesColum) => (
            <TableColumn key={tablesColum}>{tablesColum}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>{rows}</TableBody>
      </Table>
    </>
  ) : null;
}
