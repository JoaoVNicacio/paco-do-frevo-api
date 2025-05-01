/**
 * The function `getStringWithSubstringAtIndex` inserts a substring at a specified index within a given
 * input string.
 * @param {string} input - The `input` parameter is a string that represents the original text or
 * content where you want to insert a substring at a specific index.
 * @param {string} substring - The `substring` parameter in the `getStringWithSubstringAtIndex`
 * function is the string that you want to insert into the original `input` string at the specified
 * `index`.
 * @param {number} index - The `index` parameter in the `getStringWithSubstringAtIndex` function
 * represents the position within the `input` string where the `substring` will be inserted. The
 * `substring` will be inserted at this specified index in the `input` string.
 * @returns The function `getStringWithSubstringAtIndex` takes in a string `input`, a substring, and an
 * index. It returns a new string where the substring is inserted at the specified index in the input
 * string.
 */
export function getStringWithSubstringAtIndex(
  input: string,
  substring: string,
  index: number,
): string {
  if (index < 0 || index > input.length) throw new Error('Index out of range');

  return `${input.slice(0, index)}${substring}${input.slice(index)}`;
}
