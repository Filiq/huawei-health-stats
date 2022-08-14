import { useEffect, useState } from "react";
import {
  ChartBarIcon,
  HomeIcon,
  UsersIcon,
  GiftIcon,
} from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import DashboardLayout from "../../../layouts/DashboardLayout";
import sportPerMinuteState from "../../../atoms/sportPerMinute";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import numberWithSpaces from "../../../lib/numberWithSpaces";
import { useRouter } from "next/router";

export default function Support() {
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
      current: false,
    },
    {
      name: "Support",
      href: "/dashboard/support",
      icon: GiftIcon,
      current: true,
    },
  ];

  return (
    <DashboardLayout navigation={navigation}>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto space-y-4">
          <h1 className="mb-4 text-3xl font-semibold text-gray-900">Support</h1>
          <p>
            Do you like this small project? You can support me with Bitcoin.
          </p>
          <p>
            BTC:{" "}
            <span className="font-semibold">
              bc1q8xp2d42spfrp8fmy63feznh32k6qfxucsdda4f
            </span>
          </p>
          <div className="w-64">
            <img src="/btc.png"></img>
          </div>
          <p>
            If you have any ideas or questions, you can contact me at{" "}
            <a href="mailto:contact@filiq.net" className="text-blue-600">
              contact@filiq.net
            </a>
            .
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
