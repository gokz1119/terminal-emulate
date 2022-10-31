import { getStorage, ref, listAll } from "firebase/storage";
const storage = getStorage();
const listRef = ref(storage, "Countries");

export function listhandler() {
  let contents = [];
  return listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        console.log(itemRef.name);
        contents.push(itemRef.name);
      });
      res.prefixes.forEach((foldRef) => {
        console.log(foldRef.name);
        contents.push(foldRef.name);
      });
      return { status: true, contents: contents };
    })
    .catch((e) => {
      console.log(e);
      return { status: false, contents: ["No files found!"] };
    });
}
