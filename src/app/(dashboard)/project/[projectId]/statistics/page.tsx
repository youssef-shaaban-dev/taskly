import React from "react";
import { StatisticsContainer } from "@/components/features/dashboard/statistics/StatisticsContainer";

export const metadata = {
  title: "Project Statistics | Taskly",
  description: "View specific project statistics and trends.",
};

export default function ProjectStatisticsPage() {
  return <StatisticsContainer />;
}
