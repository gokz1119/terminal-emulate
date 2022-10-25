import { db } from "../firebase-config";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export function cdhandler(f_path) {
  const storage = getStorage();

  //path to file (DOESN'T INCLUDE FILE ITSELF)
  const pathtofile = f_path;

  const storageRef = ref(storage, pathtofile);
  if (storageRef){
    return { status: true, message: "Directory changed" };
  }
  else{
    return { status: false, message: "directory doesn't exist" };
  }
}
