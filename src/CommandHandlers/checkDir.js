import { getStorage, ref, listAll } from "firebase/storage";

export function checkDir(dir, workingDirectory) {
  const storage = getStorage();
  const listRef = ref(storage, workingDirectory);
  return listAll(listRef)
    .then((res) => {
      let dirExists = false;
      res.prefixes.forEach((folderRef) => {
        if (folderRef.name === dir) {
          dirExists = true;
          //return {dirExists};
          console.log(folderRef.name, ", ", dir);
        }
      });
      console.log(dirExists);
      return dirExists;
    })
    .catch((e) => {
      console.log(e);
      return false;
    });
}
