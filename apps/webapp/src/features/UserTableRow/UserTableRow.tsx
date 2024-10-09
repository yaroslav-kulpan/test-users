import React, {memo} from "react";

import Button from "../../components/Button";
import { TableCell, TableRow } from "../../components/Table";
import { humanizeDate } from "../../utils/humanize-date";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { User } from "../../types/users.interface";

type UserTableRowProps = {
  user: User;
  handleEdit: (id: number) => () => Promise<void>;
  handleDelete: (id: number) => () => Promise<void>;
};

export function UserTableRow({
  handleDelete,
  handleEdit,
  user,
}: UserTableRowProps) {
  const { id, email, updatedAt, createdAt, first_name, last_name, profile } =
    user;

  return (
    <TableRow className="group">
      <TableCell>{email}</TableCell>
      <TableCell>{first_name}</TableCell>
      <TableCell>{last_name}</TableCell>
      <TableCell>{profile?.age}</TableCell>
      <TableCell>{profile?.gender}</TableCell>
      <TableCell>{profile?.height}</TableCell>
      <TableCell>{profile?.weight}</TableCell>
      <TableCell>{humanizeDate(createdAt)}</TableCell>
      <TableCell>{humanizeDate(updatedAt)}</TableCell>
      <TableCell className="flex gap-x-3 justify-end" align="center">
        <Button variant="contained" color="primary" onClick={handleEdit(id)}>
          <PencilIcon className="h-4 w-4 text-white" />
        </Button>
        <Button variant="contained" color="danger" onClick={handleDelete(id)}>
          <TrashIcon className="h-4 w-4 text-white" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default memo(UserTableRow);