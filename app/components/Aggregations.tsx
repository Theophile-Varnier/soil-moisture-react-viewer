"use client";
import styles from "../drawers.module.css";
import { useAppDispatch } from "@/lib/hooks";

import { ActionIcon, Drawer, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GrAggregate } from "react-icons/gr";
import useGetAggregations from "../hooks/useGetAggregations";
import { setSelectedAggregationId } from "@/lib/features/map/mapSlice";

export function Aggregations() {
  const dispatch = useAppDispatch();
  const { aggregations } = useGetAggregations();
  const [opened, { open, close }] = useDisclosure(false);

  const buttonClassName = `${styles.toggleButton} ${styles.right}`;

  const rows = aggregations?.map((aggregation) => (
    <div
      key={aggregation.id}
      className={styles.aggregationLine}
      onClick={() => dispatch(setSelectedAggregationId(aggregation.id))}
    >
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
