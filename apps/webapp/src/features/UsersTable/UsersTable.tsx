import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

import Table from "../../components/Table/Table";
import TablePagination from "../../components/TablePagination/TablePagination";
import {
  TableBody,
  TableColumn,
  TableHeader,
} from "../../components/Table";
import { User, UsersListResponse } from "../../types/users.interface";
import Button from "../../components/Button";
import { FullScreenLoader } from "../../components/FullScreenLoader";
import { UserTableRow } from "../UserTableRow";

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
  return error ? (
    <>Oh no, there was an error</>
  ) : isLoading ? (
    <FullScreenLoader />
  ) : users ? (
    <>
      {isTableLoading && <FullScreenLoader />}
      <Table
        list={users}
        caption={`Users, total - ${total}`}
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
        <TableBody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </TableBody>
      </Table>
    </>
  ) : null;
}
