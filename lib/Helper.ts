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

export { Stringify, addId };
