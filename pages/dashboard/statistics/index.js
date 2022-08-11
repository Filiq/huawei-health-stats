import { useEffect, useState } from "react";
import { ChartBarIcon, HomeIcon, UsersIcon } from "@heroicons/react/outline";

import { useRecoilState } from "recoil";
import DashboardLayout from "../../../layouts/DashboardLayout";
import sportPerMinuteState from "../../../atoms/sportPerMinute";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import numberWithSpaces from "../../../lib/numberWithSpaces";
import { useRouter } from "next/router";

export default function Statistics() {
  const [stats, setStats] = useState([]);
  const [sportPerMinuteData, setSportPerMinuteData] =
    useRecoilState(sportPerMinuteState);

  const router = useRouter();

  useEffect(() => {
    if (sportPerMinuteData.length === 0) {
      router.push("/dashboard");
    }
  }, []);

  useEffect(() => {
    const data = sportPerMinuteData.map((item) => {
      return {
        ...item,
        totalSteps: item.sportDataUserData.reduce((prev, current) => {
          return prev + current.sportBasicInfos[0].steps;
        }, 0),
        totalDistance: item.sportDataUserData.reduce((prev, current) => {
          return prev + current.sportBasicInfos[0].distance;
        }, 0),
        totalCalories: item.sportDataUserData.reduce((prev, current) => {
          return prev + current.sportBasicInfos[0].calorie;
        }, 0),
      };
    });

    setSportPerMinuteData(data);

    const statsArr = [];

    statsArr.push({
      name: "Total Steps",
      stat: numberWithSpaces(
        data.reduce((prev, current) => {
          return prev + current.totalSteps;
        }, 0)
      ),
      icon: "",
    });

    statsArr.push({
      name: "Total Distance",
      stat: numberWithSpaces(
        data.reduce((prev, current) => {
          return prev + current.totalDistance;
        }, 0) /
          1000 +
          " km"
      ),
      desc:
        "Equivalent to " +
        (
          data.reduce((prev, current) => {
            return prev + current.totalDistance;
          }, 0) /
          1000 /
          42.195
        ).toFixed(2) +
        " marathons",
      icon: "",
    });

    statsArr.push({
      name: "Total Calories",
      stat: numberWithSpaces(
        data.reduce((prev, current) => {
          return prev + current.totalCalories;
        }, 0) /
          1000 +
          " kcal"
      ),
      desc:
        "Equivalent to " +
        (
          data.reduce((prev, current) => {
            return prev + current.totalCalories;
          }, 0) /
          1000 /
          257.2
        ).toFixed(2) +
        " Big Macs (assuming a Big Mac has 257.2 kcal)",
      icon: "",
    });

    setStats(statsArr);

    console.log(sportPerMinuteData);
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

  const [dateAscending, setDateAscending] = useState(false);
  const [stepsAscending, setStepsAscending] = useState(false);
  const [distanceAscending, setDistanceAscending] = useState(false);
  const [caloriesAscending, setCaloriesAscending] = useState(false);

  return (
    <DashboardLayout navigation={navigation}>
      <p className="px-4 py-3 bg-white shadow rounded-lg overflow-hidden">
        You are using Huawei Health app to track your daily steps, distance and
        calories for more than {numberWithSpaces(sportPerMinuteData.length)}{" "}
        days.
      </p>
      {/* stats */}
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
          >
            <dt className="text-sm font-medium text-gray-500 truncate">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {item.stat}
            </dd>
            {item?.desc && (
              <dd className="text-sm font-semibold text-gray-500">
                {item.desc}
              </dd>
            )}
          </div>
        ))}
      </dl>
      {/* list */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      <p
                        className="group inline-flex cursor-pointer"
                        onClick={() => {
                          const tmp = [...sportPerMinuteData];

                          setSportPerMinuteData(
                            dateAscending
                              ? tmp.sort((a, b) => a.recordDay - b.recordDay)
                              : tmp.sort((a, b) => b.recordDay - a.recordDay)
                          );

                          setDateAscending(!dateAscending);
                          setStepsAscending(false);
                          setDistanceAscending(false);
                          setCaloriesAscending(false);
                        }}
                      >
                        Date
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          {dateAscending ? (
                            <ChevronUpIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <ChevronDownIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </p>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <p
                        className="group inline-flex cursor-pointer"
                        onClick={() => {
                          const tmp = [...sportPerMinuteData];

                          setSportPerMinuteData(
                            stepsAscending
                              ? tmp.sort((a, b) => a.totalSteps - b.totalSteps)
                              : tmp.sort((a, b) => b.totalSteps - a.totalSteps)
                          );

                          setStepsAscending(!stepsAscending);
                          setDateAscending(false);
                          setDistanceAscending(false);
                          setCaloriesAscending(false);
                        }}
                      >
                        Total Steps
                        <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                          {stepsAscending ? (
                            <ChevronUpIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <ChevronDownIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </p>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <p
                        className="group inline-flex cursor-pointer"
                        onClick={() => {
                          const tmp = [...sportPerMinuteData];

                          setSportPerMinuteData(
                            distanceAscending
                              ? tmp.sort(
                                  (a, b) => a.totalDistance - b.totalDistance
                                )
                              : tmp.sort(
                                  (a, b) => b.totalDistance - a.totalDistance
                                )
                          );

                          setDistanceAscending(!distanceAscending);
                          setStepsAscending(false);
                          setDateAscending(false);
                          setCaloriesAscending(false);
                        }}
                      >
                        Total Distance (km)
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          {distanceAscending ? (
                            <ChevronUpIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <ChevronDownIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </p>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <p
                        className="group inline-flex cursor-pointer"
                        onClick={() => {
                          const tmp = [...sportPerMinuteData];

                          setSportPerMinuteData(
                            caloriesAscending
                              ? tmp.sort(
                                  (a, b) => a.totalCalories - b.totalCalories
                                )
                              : tmp.sort(
                                  (a, b) => b.totalCalories - a.totalCalories
                                )
                          );

                          setCaloriesAscending(!caloriesAscending);
                          setStepsAscending(false);
                          setDistanceAscending(false);
                          setDateAscending(false);
                        }}
                      >
                        Total Calories (kcal)
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          {caloriesAscending ? (
                            <ChevronUpIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          ) : (
                            <ChevronDownIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </p>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {sportPerMinuteData.map((day, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {parseInt(day.recordDay.toString().slice(6))}.{" "}
                        {parseInt(day.recordDay.toString().slice(4, 6))}.{" "}
                        {day.recordDay.toString().slice(0, 4)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {day.totalSteps}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {day.totalDistance / 1000}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {day.totalCalories / 1000}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <button
                          className="border px-2 py-1 rounded-2xl bg-blue-500 text-white border-blue-500 active:scale-95"
                          onClick={() => {
                            router.push(
                              `/dashboard/statistics/[id]`,
                              `/dashboard/statistics/${index}`
                            );
                          }}
                        >
                          View more
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
