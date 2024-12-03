"use client";
import styles from "./executions.module.css";
import {
  Center,
  Loader,
  Table,
  TableTh,
  TableThead,
  TableTr,
  Tooltip,
} from "@mantine/core";
import { DateTime } from "luxon";
import useGetExecutions from "../hooks/useGetExecutions";

export default function Page() {
  const { executions, isLoading } = useGetExecutions();
  const rows = executions?.map((execution) => {
    const startYear = DateTime.fromISO(execution.startDate).year;
    const endYear = DateTime.fromISO(execution.endDate).year;
    const year =
      endYear !== startYear ? `${startYear} - ${endYear}` : startYear;
    return (
      <Table.Tr key={execution.id}>
        <Table.Td>{execution.id}</Table.Td>
        <Table.Td>{execution.productType}</Table.Td>
        <Table.Td>
          {DateTime.fromISO(execution.executionStartDate).toFormat(
            "yyyy-MM-dd HH:mm:ss"
          )}
        </Table.Td>
        <Table.Td>
          {execution.executionEndDate &&
            DateTime.fromISO(execution.executionEndDate).toFormat(
              "yyyy-MM-dd HH:mm:ss"
            )}
        </Table.Td>
        <Table.Td>{year}</Table.Td>
        <Table.Td>
          {execution.jobs.map((j) => (
            <span className={styles.jobId} key={j}>
              {j}
            </span>
          ))}
        </Table.Td>
        <Table.Td>
          {execution.errors?.map((e) =>
            e.id ? (
              <Tooltip key={e.id} label={e.message}>
                <a href={`https://lobelia-earth.sentry.io/issues/${e.id}`}>
                  {e.name}
                </a>
              </Tooltip>
            ) : (
              <span key={e.message}>{e.message}</span>
            )
          )}
        </Table.Td>
      </Table.Tr>
    );
  });
  return (
    <div>
      <Table stickyHeader stickyHeaderOffset={100}>
        <TableThead>
          <TableTr>
            <TableTh>Id</TableTh>
            <TableTh>Product Type</TableTh>
            <TableTh>Execution start date</TableTh>
            <TableTh>Execution end date</TableTh>
            <TableTh>Year</TableTh>
            <TableTh>Jobs</TableTh>
            <TableTh>Errors</TableTh>
          </TableTr>
        </TableThead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {isLoading && (
        <Center>
          <Loader color="blue" />
        </Center>
      )}
    </div>
  );
}
