import { getStorage, ref, deleteObject } from "firebase/storage";
const storage = getStorage();

export function rmhandler(f_name, workingDirectory) {
  const f_path = workingDirectory + "/" + f_name;
  const fileRef = ref(storage, f_path);

  // Delete the file
  return deleteObject(fileRef)
    .then(() => {
      console.log("File deleted");
      return { status: true, message: "File deleted successfully" };
    })
    .catch((error) => {
      console.log(error);
      return { status: false, message: "Uh oh! Unable to delete file" };
    });
}
