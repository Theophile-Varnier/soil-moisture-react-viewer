"use client";

import {
  Center,
  Loader,
  Table,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";
import { selectDisplayedJobs } from "@/lib/features/jobs/jobsSlice";
import { useAppSelector } from "@/lib/hooks";

export default function Page() {
  const jobs = useAppSelector(selectDisplayedJobs);
  const isLoading = false;

  const rows = jobs?.map((job) => (
    <TableTr key={job.id}>
      <TableTd>{job.id}</TableTd>
      <TableTd>{job.name}</TableTd>
      <TableTd>{job.productType}</TableTd>
      <TableTd>{job.createdAt}</TableTd>
      <TableTd>{job.startDate}</TableTd>
    </TableTr>
  ));
  return (
    <div>
      <Table stickyHeader stickyHeaderOffset={100}>
        <TableThead>
          <TableTr>
            <TableTh>Id</TableTh>
            <TableTh>Name</TableTh>
            <TableTh>Product type</TableTh>
            <TableTh>Created at</TableTh>
            <TableTh>Start date</TableTh>
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
