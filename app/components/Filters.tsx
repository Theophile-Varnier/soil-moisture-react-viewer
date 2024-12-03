"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "../drawers.module.css";

import {
  ActionIcon,
  Drawer,
  Stack,
  Textarea,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { DatePickerInput, DateValue } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { MdTune } from "react-icons/md";
import {
  selectFilters,
  setExecutionsFilters,
  setUiFilters,
} from "@/lib/features/filters/filtersSlice";
import { useState } from "react";
import { DateTime } from "luxon";

export function Filters() {
  const idRegex = new RegExp(
    "[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}",
    "g"
  );
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const filters = useAppSelector(selectFilters);
  const [datesValue, setDatesValue] = useState<[DateValue, DateValue]>([
    DateTime.fromMillis(filters.executions.startDate).toJSDate(),
    DateTime.fromMillis(filters.executions.endDate).toJSDate(),
  ]);

  function setDatesFilter(value: [DateValue, DateValue]) {
    setDatesValue([value[0], value[1]]);
    if (value[0] && value[1]) {
      dispatch(
        setExecutionsFilters({
          ...filters.executions,
          startDate: DateTime.fromJSDate(value[0]!).toMillis(),
          endDate: DateTime.fromJSDate(value[1]!).toMillis(),
        })
      );
    }
  }

  const [errorValue, setErrorValue] = useState<string | undefined>(
    filters.ui.error
  );

  function setErrorFilter(value: string) {
    setErrorValue(value);
    dispatch(
      setUiFilters({
        ...filters.ui,
        error: value,
      })
    );
  }

  const [idsValue, setIdsValue] = useState<string>("");

  function parseInput(value: string) {
    setIdsValue(value);
    const ids = value.match(idRegex) ?? [];
    dispatch(setUiFilters({ ...filters.ui, ids }));
  }

  const buttonClassName = `${styles.toggleButton} ${styles.left}`;

  return (
    <>
      <Drawer opened={opened} onClose={close}>
        <Stack>
          <DatePickerInput
            value={datesValue}
            valueFormat="DD/M/YYYY"
            label="Select range"
            type="range"
            onChange={setDatesFilter}
          ></DatePickerInput>
          <TextInput
            value={errorValue}
            onChange={(event) => setErrorFilter(event.currentTarget.value)}
            label="Error"
            description="Search for error id, name or message"
          />
          <Textarea
            value={idsValue}
            onChange={(event) => parseInput(event.currentTarget.value)}
            label="Job ids"
            description="Search for job ids"
          />
        </Stack>
      </Drawer>
      <div className={buttonClassName}>
        <Tooltip label="Show filters" position="right">
          <ActionIcon
            size={42}
            variant="filled"
            aria-label="Settings"
            onClick={open}
          >
            <MdTune />
          </ActionIcon>
        </Tooltip>
      </div>
    </>
  );
}
