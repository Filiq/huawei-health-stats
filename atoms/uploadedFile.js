import { atom } from "recoil";

const uploadedFileState = atom({
  key: "uploadedFileState",
  default: null,
});

export default uploadedFileState;
