"use client";
import {
  envs,
  selectAuth,
  setAuth,
  setUser,
} from "@/lib/features/auth/authSlice";
import { Button, Group, Select, TextInput, useCombobox } from "@mantine/core";
import { useEffect, useState } from "react";
import { useGetUserUsersWhoamiGetQuery } from "@/lib/api/smApi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Header() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const [enabled, setEnabled] = useState<boolean>(false);
  const { data } = useGetUserUsersWhoamiGetQuery(undefined, {
    skip: !enabled,
  });

  useEffect(() => {
    if (data) dispatch(setUser(data));
  }, [data, dispatch]);

  const elements = auth.user ? (
    <h1>{auth.user.givenNames}</h1>
  ) : (
    <Group h={60}>
      <Select
        data={Object.keys(envs)}
        value={auth.env}
        onChange={(v) => dispatch(setAuth({ ...auth, env: v }))}
      ></Select>
      <TextInput
        type="password"
        placeholder="API Key"
        value={auth.apiKey}
        onChange={(event) =>
          dispatch(setAuth({ ...auth, apiKey: event.currentTarget.value }))
        }
      ></TextInput>
      <Button variant="filled" onClick={() => setEnabled(true)}>
        Login
      </Button>
    </Group>
  );

  return elements;
}
