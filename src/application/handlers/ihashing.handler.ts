interface IHashingHandler {
  /**
   * This method hashes a string based on the rules
   * defined on the implementation of this abstraction.
   * @param value : the string to be hashed;
   */
  hashValue(value: string): string;

  /**
   * This method compares a plain text to its
   * possible hash based on the rules
   * defined on the implementation of this abstraction.
   * and return if both are compatible.
   * @param plainText : The plain text value
   * @param hash : The hashed value
   */
  comparePlainTextToHash(plainText: string, hash: string): boolean;
}

const IHashingHandler = Symbol('IHashingHandler');

export default IHashingHandler;
