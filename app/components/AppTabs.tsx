"use client";
import { usePathname, useRouter } from "next/navigation";
import { Tabs } from "@mantine/core";

export default function AppTabs() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Tabs
      value={pathname as string}
      onChange={(value) => router.push(`${value}`)}
    >
      <Tabs.List>
        <Tabs.Tab value="/jobs">Jobs</Tabs.Tab>
        <Tabs.Tab value="/executions">Executions</Tabs.Tab>
        <Tabs.Tab value="/map">Map</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
