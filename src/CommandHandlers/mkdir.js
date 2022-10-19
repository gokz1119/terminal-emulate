import { db } from "../firebase-config";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export function mkdirhandler(f_path) {
  const storage = getStorage();

  //path to file (DOESN'T INCLUDE FILE ITSELF)
  const pathtofile = f_path;
  // const pathtofile = "Countries/states/city/";

  //name of the file to be created
  //   const filename=f_name;
  const filename = ".t_ignore";

  //making the final path from the path and the filename
  const finalpath = pathtofile + "/" + filename;

  //content to be placed inside the text file
  //   const filecontents=f_content;
  const filecontents = "mec mecmecmemec";

  const file = new File([filecontents], filename, {
    type: "text/plain",
  });

  const storageRef = ref(storage, finalpath);
  return uploadBytes(storageRef, file)
    .then((snapshot) => {
      console.log("Uploaded a blob or file!");
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
