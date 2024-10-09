import React, { useMemo } from "react";
import { Select } from "../../components/Select/Select";
import { SelectItem } from "../../components/Select/SelectItem";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { CreateUserDto } from "../../types/users.interface";
import { GenderEnum } from "../../types/users-profile.interface";
import Button from "../../components/Button";
import { modalActionsStyles } from "../../components/Modal/Modal.theme";
import { Input } from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { userFormValidationSchema } from "./user-form-validation.schema";
import { FullScreenLoader } from "../../components/FullScreenLoader";

const { actionsWrapper, divider } = modalActionsStyles();

type UserFormProps = {
  onSubmit: SubmitHandler<CreateUserDto>;
  isFormLoading: boolean;
  onDismiss: () => void;
  defaultValues?: () => Promise<CreateUserDto>;
};

export default function UserForm({
  onDismiss,
  onSubmit,
  isFormLoading,
  defaultValues,
}: UserFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserDto>({
    resolver: yupResolver(userFormValidationSchema),
    defaultValues,
  });

  const isSubmitFormDisabled = useMemo(
    () => isFormLoading || Object.keys(errors ?? {}).length > 0,
    [errors, isFormLoading],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      {isFormLoading && <FullScreenLoader />}
      <div className="mb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Input
            label="First name*"
            autoFocus
            id="first_name"
            type="text"
            autoComplete="given-name"
            disabled={isFormLoading}
            error={errors.first_name?.message}
            {...register("first_name")}
          />
        </div>

        <div className="sm:col-span-3">
          <Input
            label="Last name*"
            id="last_name"
            type="text"
            error={errors.last_name?.message}
            autoComplete="given-name"
            disabled={isFormLoading}
            {...register("last_name")}
          />
        </div>

        <div className="sm:col-span-3">
          <Input
            label="Email*"
            id="email"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
            disabled={isFormLoading}
          />
        </div>

        <div className="sm:col-span-3">
          <Select
            label="Gender*"
            id="gender"
            autoComplete="gender"
            error={errors?.profile?.gender?.message}
            disabled={isFormLoading}
            defaultValue={GenderEnum.OTHER}
            {...register("profile.gender")}
          >
            <SelectItem value={GenderEnum.FEMALE}>Female</SelectItem>
            <SelectItem value={GenderEnum.MALE}>Male</SelectItem>
            <SelectItem value={GenderEnum.NON_BINARY}>Non Binary</SelectItem>
            <SelectItem value={GenderEnum.OTHER}>Other</SelectItem>
          </Select>
        </div>
        <div className="sm:col-span-3">
          <Input
            id="age"
            label="Age*"
            autoComplete="age"
            type="number"
            disabled={isFormLoading}
            error={errors?.profile?.age?.message}
            {...register("profile.age", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="sm:col-span-3">
          <Input
            label="Height*"
            id="height"
            type="number"
            disabled={isFormLoading}
            error={errors?.profile?.height?.message}
            {...register("profile.height", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="sm:col-span-3">
          <Input
            label="Weight*"
            id="weight"
            type="number"
            error={errors?.profile?.weight?.message}
            disabled={isFormLoading}
            {...register("profile.weight", {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>
      <div className={divider()}>
        <div className={actionsWrapper()}>
          <Button
            variant="outlined"
            size="sm"
            color="secondary"
            onClick={onDismiss}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitFormDisabled}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
