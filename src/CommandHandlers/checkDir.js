import { getStorage, ref, listAll } from "firebase/storage";
const storage = getStorage();
const listRef = ref(storage, "Countries/states");

export function checkDir() {
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => console.log(folderRef.name));
    })
    .catch((e) => {
      console.log(e);
    });
}
