import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CreateUserDto,
  User,
  UsersListResponse,
} from "../types/users.interface";
import type { PatchResult } from "../types/patch-collection.types";
import { isUser, isUserListResponse } from "../utils/redux.utils";
import type { PaginationQuery } from "../types/pagination-query.interface";

const BASE_URL = import.meta.env.VITE_BASE_URL

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<UsersListResponse, PaginationQuery>({
      query: ({ limit, offset }) => `/users?limit=${limit}&offset=${offset}`,
      transformResponse: (response: { data: User[]; total: number }) => ({
        data: response.data,
        total: response.total,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Users" as const, id })),
              { type: "Users" as const, id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    getUserById: builder.query<User, { id: number }>({
      query: ({ id }) => `/users/${id}`,
      transformResponse: (response: { data: User }) => response.data,
      providesTags: (_result, _error, { id }) => [{ type: "Users", id }],
    }),
    createUser: builder.mutation<User, CreateUserDto>({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      transformResponse: (response: { data: User }) => response.data,
      async onQueryStarted(newUser, { dispatch, queryFulfilled, getState }) {
        const tempId = Date.now();

        // Store patch results along with endpointName and originalArgs
        const patchResults: Array<PatchResult> = [];
        const state = getState();

        const cacheEntries = usersApi.util.selectInvalidatedBy(state, [
          { type: "Users", id: "LIST" },
        ]);

        cacheEntries.forEach(({ endpointName, originalArgs }) => {
          const patchResult = dispatch(
            usersApi.util.updateQueryData(
              endpointName as "getUsers",
              originalArgs,
              (draft) => {
                if (isUserListResponse(draft)) {
                  draft.data.push({
                    ...newUser,
                    id: tempId,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  });
                  draft.total = draft.total + 1;
                }
              },
            ),
          );
          patchResults.push({ patchResult, endpointName, originalArgs });
        });

        try {
          // Wait for the mutation to complete
          const { data: returnedUser } = await queryFulfilled;

          // Replace the temporary ID with the actual ID from the server
          patchResults.forEach(({ endpointName, originalArgs }) => {
            dispatch(
              usersApi.util.updateQueryData(
                endpointName as "getUsers",
                originalArgs,
                (draft) => {
                  if (isUserListResponse(draft)) {
                    const userIndex = draft.data.findIndex(
                      (user) => user.id === tempId,
                    );
                    if (userIndex !== -1) {
                      draft.data[userIndex] = returnedUser;
                    }
                  }
                },
              ),
            );
          });
        } catch {
          // Undo optimistic updates if the mutation fails
          patchResults.forEach(({ patchResult }) => patchResult.undo());
        }
      },
    }),
    updateUser: builder.mutation<User, { id: number; userData: Partial<User> }>(
      {
        query: ({ id, userData }) => ({
          url: `/users/${id}`,
          method: "PUT",
          body: userData,
        }),
        transformResponse: (response: { data: User }) => response.data,
        async onQueryStarted(
          { id, userData },
          { dispatch, queryFulfilled, getState },
        ) {
          const patchResults: Array<PatchResult> = [];
          const state = getState();

          const cacheEntries = usersApi.util.selectInvalidatedBy(state, [
            { type: "Users", id },
          ]);

          cacheEntries.forEach(({ endpointName, originalArgs }) => {
            const patchResult = dispatch(
              usersApi.util.updateQueryData(
                endpointName as "getUsers" | "getUserById",
                originalArgs,
                (draft) => {
                  if (isUserListResponse(draft)) {
                    // For getUsers
                    const userIndex = draft.data.findIndex(
                      (user) => user.id === id,
                    );
                    if (userIndex !== -1) {
                      draft.data[userIndex] = {
                        ...draft.data[userIndex],
                        ...userData,
                      };
                    }
                  } else if (isUser(draft)) {
                    // For getUserById
                    Object.assign(draft, userData);
                  }
                },
              ),
            );
            patchResults.push({ patchResult, endpointName, originalArgs });
          });

          try {
            const { data: returnedUser } = await queryFulfilled;

            // Optionally update the cache with the server response
            patchResults.forEach(({ endpointName, originalArgs }) => {
              dispatch(
                usersApi.util.updateQueryData(
                  endpointName as "getUsers" | "getUserById",
                  originalArgs,
                  (draft) => {
                    if (isUserListResponse(draft)) {
                      const userIndex = draft.data.findIndex(
                        (user) => user.id === id,
                      );
                      if (userIndex !== -1) {
                        draft.data[userIndex] = returnedUser;
                      }
                    } else if (isUser(draft)) {
                      Object.assign(draft, returnedUser);
                    }
                  },
                ),
              );
            });
          } catch {
            patchResults.forEach(({ patchResult }) => patchResult.undo());
          }
        },
      },
    ),
    deleteUser: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
        const patchResults: Array<PatchResult> = [];
        const state = getState();

        const cacheEntries = usersApi.util.selectInvalidatedBy(state, [
          { type: "Users", id },
          { type: "Users", id: "LIST" },
        ]);

        cacheEntries.forEach(({ endpointName, originalArgs }) => {
          const patchResult = dispatch(
            usersApi.util.updateQueryData(
              endpointName as "getUsers" | "getUserById",
              originalArgs,
              (draft) => {
                if (isUserListResponse(draft)) {
                  draft.data = draft.data.filter((user) => user.id !== id);
                  draft.total = draft.total - 1;
                } else if (isUser(draft)) {
                  return undefined;
                }
              },
            ),
          );
          patchResults.push({ patchResult, endpointName, originalArgs });
        });

        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach(({ patchResult }) => patchResult.undo());
        }
      },
    }),
  }),
});

export const {
  useLazyGetUserByIdQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
