export function isSpaceIncluded(value) {
  return /^.*\s+.*$/.test(value);
}

export function mapToArray(map, key) {
  const arr = Object.values(map);
  Object.keys(map).forEach((value, index) => {
    arr[index][key] = value;
  });
  return arr;
}
