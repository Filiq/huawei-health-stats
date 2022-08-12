import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function DayDetailsModal({ details, open, setOpen }) {
  let scrollTopRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
        initialFocus={scrollTopRef}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
            ref={scrollTopRef}
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="space-y-4 relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full sm:p-6">
              {details.map((detail, index) => (
                <div
                  className="bg-white shadow overflow-hidden sm:rounded-lg"
                  key={index}
                >
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-semibold text-gray-900 flex justify-between">
                      {(new Date(detail?.startTime).getHours() < 10
                        ? "0"
                        : "") + new Date(detail?.startTime).getHours()}
                      :
                      {(new Date(detail?.startTime).getMinutes() < 10
                        ? "0"
                        : "") + new Date(detail?.startTime).getMinutes()}
                      :
                      {(new Date(detail?.startTime).getSeconds() < 10
                        ? "0"
                        : "") + new Date(detail?.startTime).getSeconds()}{" "}
                      -{" "}
                      {(new Date(detail?.endTime).getHours() < 10 ? "0" : "") +
                        new Date(detail?.endTime).getHours()}
                      :
                      {(new Date(detail?.endTime).getMinutes() < 10
                        ? "0"
                        : "") + new Date(detail?.endTime).getMinutes()}
                      :
                      {(new Date(detail?.endTime).getSeconds() < 10
                        ? "0"
                        : "") + new Date(detail?.endTime).getSeconds()}
                      <span className="text-gray-600 font-normal">
                        Timezone: {detail.timeZone}
                      </span>
                    </h3>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Steps
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {detail?.sportBasicInfos?.[0]?.steps}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Distance
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {detail?.sportBasicInfos?.[0]?.distance / 1000} km
                        </dd>
                      </div>
                      {detail?.sportBasicInfos?.[0]?.altitude !== 0 && (
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Altitude
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {detail?.sportBasicInfos?.[0]?.altitude}
                          </dd>
                        </div>
                      )}
                      {detail?.sportBasicInfos?.[0]?.floor !== 0 && (
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Floors
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {detail?.sportBasicInfos?.[0]?.floor}
                          </dd>
                        </div>
                      )}
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Calories
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {detail?.sportBasicInfos?.[0]?.calorie / 1000} kcal
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Sport Type
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {detail?.sportType === 4
                            ? "Running"
                            : detail?.sportType === 5
                            ? "Walking"
                            : "unknown (cycling probably)"}{" "}
                          ({detail?.sportType})
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Device Code
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {detail?.deviceCode}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Version
                        </dt>
                        <dd
                          className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                          onClick={() => {
                            console.log("pico");
                            document.getElementById("vole").scrollTo(0, 0);
                          }}
                        >
                          {detail?.version}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              ))}

              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Go Back to Charts
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
