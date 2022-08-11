import { useEffect, useState } from "react";
import { ChartBarIcon, HomeIcon, UsersIcon } from "@heroicons/react/outline";

import { useRecoilState } from "recoil";
import DashboardLayout from "../../layouts/DashboardLayout";
import sportPerMinuteState from "../../atoms/sportPerMinute";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

export default function Statistics() {
  const [sportPerMinuteData, setSportPerMinuteData] =
    useRecoilState(sportPerMinuteState);

  useEffect(() => {
    // sportPerMinuteData[4].sportDataUserData.reduce((prev, current) => {
    //   prev + current.sportBasicInfos[0].steps;

    // }, 0);

    setSportPerMinuteData(
      sportPerMinuteData.map((item) => {
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
      })
    );

    //console.log(sportPerMinuteData, " default");
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
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                              `/dashboard/motion-days/[id]`,
                              `/dashboard/motion-days/${index}`
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
