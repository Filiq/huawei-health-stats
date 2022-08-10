import { useEffect, useState } from "react";
import { ChartBarIcon, HomeIcon, UsersIcon } from "@heroicons/react/outline";

import { useRecoilValue } from "recoil";
import motionPathDataState from "../../atoms/motionPathData";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function Statistics() {
  const motionPathData = useRecoilValue(motionPathDataState);

  useEffect(() => {
    console.log(motionPathData);
  }, []);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: false },
    {
      name: "Motion Paths",
      href: "/dashboard/motion-paths",
      icon: UsersIcon,
      current: false,
    },
    {
      name: "Statistics",
      href: "/dashboard/statistics",
      icon: ChartBarIcon,
      current: true,
    },
  ];

  return <DashboardLayout navigation={navigation}></DashboardLayout>;
}
