import { db } from "../firebase-config";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { checkDir } from "./checkDir";

export function cdhandler(dir, workingDirectory) {
  // const storage = getStorage();

  return checkDir(dir, workingDirectory)
    .then((result) => {
      console.log({ result });
      if (result) return { status:true, message: "Directory exists" };
      else return { status:false, message: "Directory doesn't exist" };
    })
    .catch((e) => {
      return { status:false, message: "Unable to get directory details!" };
    });
}
