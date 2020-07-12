import { openDB } from "idb";

const dbPromise = openDB("comments", 2, {
  upgrade(db) {
    db.createObjectStore("comments");
  },
});

export const idbKeyval = {
  async get(key) {
    return (await dbPromise).get("comments", key);
  },
  async set(key, val) {
    return (await dbPromise).put("comments", val, key);
  },
  async delete(key) {
    return (await dbPromise).delete("comments", key);
  },
  async clear() {
    return (await dbPromise).clear("comments");
  },
  async keys() {
    return (await dbPromise).getAllKeys("comments");
  },
};

export async function updateTag(tag, comment) {
  const val = (await idbKeyval.get(tag)) || {};

  await idbKeyval.set(tag, { ...val, [comment.id]: comment });
}

export async function getCommentsIds() {
  const keys = await idbKeyval.keys();
  let ids = [];
  for (const key of keys) {
    const val = (await idbKeyval.get(key)) || {};
    ids = [...ids, ...Object.keys(val)];
  }
  return ids;
}
