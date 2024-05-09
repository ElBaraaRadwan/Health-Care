const Stringify = (prop: any[] | any): any[] | any => {
  const updatedData = JSON.stringify(
    prop,
    (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
  );
  return JSON.parse(updatedData);
};

function addId(numbers: number[]): { userID: number }[] {
  const uniqueNumbers = [...new Set(numbers)]; // Remove duplicates using Set
  return uniqueNumbers.map((number) => ({ userID: number })) || [];
}

export { Stringify, addId };
