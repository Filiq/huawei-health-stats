import { atom } from "recoil";

const fileNamesState = atom({
  key: "fileNamesState",
  default: { motionPath: "", sportPerMinute: "" },
});

export default fileNamesState;
