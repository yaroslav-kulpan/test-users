import React, { useCallback } from "react";
import { useModal } from "../../hooks/use-modal";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../services/users";
import { toast } from "react-toastify";
import { Modal } from "../../components/Modal";
import { ModalTitle } from "../../components/Modal/ModalTitle";
import { ModalContent } from "../../components/Modal/ModalContent";
import UserForm from "../../features/UserForm/UserForm";
import { UsersTable } from "../../features/UsersTable";
import { Container } from "../../components/Container";
import type { CreateUserDto, User } from "../../types/users.interface";
import { Dialog } from "../../features/Dialog";
import { useQueryParams } from "../../hooks/use-query-params";

const modals = ["add", "edit"] as const;

export function Users() {
  const { isOpen, modalType, userId, openModal, closeModal } = useModal();
  const [getUserById, { status: getUserByIdStatus }] =
    useLazyGetUserByIdQuery();
  const [deleteItem] = useDeleteUserMutation();
  const [createUser, { isLoading: isCreatingUserLoading }] =
    useCreateUserMutation();
  const [updateUser, { isLoading: isUpdatingUserLoading }] =
    useUpdateUserMutation();
  const [queryParams, setQueryParams] = useQueryParams();
  const {
    data,
    error,
    isLoading,
    status: reFetchStatus,
    refetch: reFetchUsers,
  } = useGetUsersQuery({
    limit: queryParams.limit ? Number(queryParams.limit): 10,
    offset: queryParams.offset ? Number(queryParams.offset) : 0,
  });
  const { data: users = [], total = 0 } = data ?? {};

  const handleApplyDelete = useCallback(async () => {
    if (!userId) return;
    closeModal();
    await toast.promise(
      deleteItem({ id: userId }).unwrap(),
      {
        pending: "Deleting user...",
        success: "User deleted successfully",
        error: "User deleting error",
      },
      {
        position: "top-center",
        type: "success",
      },
    );
  }, [userId, deleteItem]);

  const handleCreate = useCallback(() => {
    openModal("add");
  }, []);

  const handleEdit = useCallback(
    (id: number) => async () => {
      openModal("edit", id);
    },
    [],
  );

  const handleDelete = useCallback(
    (id: number) => async () => {
      openModal("delete", id);
    },
    [],
  );

  const handleSubmitUser = async (userData: CreateUserDto) => {
    try {
      if (modalType === "add") {
        await createUser(userData).unwrap();
        toast(`User ${userData.email} created successfully`, {
          type: "success",
        });
      } else if (modalType === "edit" && userId) {
        await updateUser({ id: userId, userData }).unwrap();
        toast(`User ${userData.email} updated successfully`, {
          type: "success",
        });
      }
      closeModal();
    } catch (err: any) {
      toast(err?.data?.message ?? "Something went wrong", {
        type: "error",
      });
    }
  };

  const defaultValues = useCallback(async () => {
    if (!userId) return {} as User;
    return getUserById({ id: userId }).unwrap();
  }, [userId, getUserById]);

  const handleNextPage = useCallback(() => {
    const newOffset = String(
      Number(queryParams.offset) + Number(queryParams.limit),
    );
    setQueryParams({ offset: newOffset });
  }, [queryParams, setQueryParams]);

  const handlePrevPage = useCallback(() => {
    const newOffset = Math.max(
      Number(queryParams.offset) - Number(queryParams.limit),
      0,
    );
    setQueryParams({ offset: String(newOffset) });
  }, [queryParams, setQueryParams]);

  return (
    <Container className="mt-10">
      <UsersTable
        error={error}
        isTableLoading={reFetchStatus === "pending"}
        isLoading={isLoading}
        refetch={() => reFetchUsers().unwrap()}
        handleCreate={handleCreate}
        handleDelete={handleDelete}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handleEdit={handleEdit}
        total={total}
        users={users}
      />
      {modals.map((modal) => (
        <Modal
          open={isOpen && modalType === modal}
          onClose={closeModal}
          key={modal}
        >
          <ModalTitle>
            {modalType === "add" ? "Add User" : "Edit User"}
          </ModalTitle>
          <ModalContent>
            <UserForm
              defaultValues={modalType === "edit" ? defaultValues : undefined}
              isFormLoading={
                (modalType === "add"
                  ? isCreatingUserLoading
                  : isUpdatingUserLoading) || getUserByIdStatus === "pending"
              }
              onDismiss={closeModal}
              onSubmit={handleSubmitUser}
            />
          </ModalContent>
        </Modal>
      ))}
      <Dialog
        isOpen={userId !== null && modalType === "delete"}
        onApply={handleApplyDelete}
        onDismiss={closeModal}
      />
    </Container>
  );
}
