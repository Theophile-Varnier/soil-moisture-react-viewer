"use client";
import styles from "../drawers.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { ActionIcon, Drawer, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useGetExecutions from "../hooks/useGetExecutions";
import { selectAggregations } from "@/lib/features/map/ mapSlice";
import { GrAggregate } from "react-icons/gr";

export function Aggregations() {
  const dispatch = useAppDispatch();
  const { executions } = useGetExecutions();
  const aggregations = useAppSelector((state) =>
    selectAggregations(executions)
  );
  const [opened, { open, close }] = useDisclosure(
    !(!executions || !executions.length)
  );

  const buttonClassName = `${styles.toggleButton} ${styles.right}`;

  const rows = aggregations?.map((aggregation) => (
    <div key={aggregation.id} className={styles.aggregationLine}>
      <span>
        {aggregation.geoLocation ?? aggregation.id} ({aggregation.jobs.length})
      </span>
      <span style={{ fontStyle: "italic" }}>
        {aggregation.start.year} - {aggregation.end.year}
      </span>
    </div>
  ));

  return (
    <>
      <Drawer position="right" opened={opened} onClose={close}>
        {rows}
      </Drawer>
      <div className={buttonClassName}>
        <Tooltip label="Show aggregations" position="left">
          <ActionIcon
            size={42}
            variant="filled"
            aria-label="Settings"
            onClick={open}
          >
            <GrAggregate />
          </ActionIcon>
        </Tooltip>
      </div>
    </>
  );
}
