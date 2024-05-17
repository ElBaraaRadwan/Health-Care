import { Prisma } from "@prisma/client";

const Stringify = (prop: any[] | any): any[] | any => {
  const updatedData = JSON.stringify(
    prop,
    (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
  );
  return JSON.parse(updatedData);
};

function addId(strings: string[]): { id: string }[] {
  const uniqueStrings = [...new Set(strings)]; // Remove duplicates using Set
  return uniqueStrings.map((string) => ({ id: string })) || [];
}

const delValue = (a: Prisma.JsonValue, b: string) => {
  if (a && typeof a === "object") {
    for (let key in a) {
      if (a.hasOwnProperty(key) && key === b) {
        delete (a as { [key: string]: any })[key];
      }
    }
  }
};

export { Stringify, addId, delValue };
