interface IHashingHandler {
  /**
   * This method hashes a string based on the rules
   * defined on the implementation of this abstraction.
   * @param value : the string to be hashed;
   */
  hashValue(value: string): string;

  /**
   * This method compares two hashes based on the rules
   * defined on the implementation of this abstraction.
   * and return if both are compatible.
   * @param firstValue : The first hashed value
   * @param secondValue : The second hashed value
   */
  compareHashes(firstValue: string, secondValue: string): boolean;
}

const IHashingHandler = Symbol('IHashingHandler');

export default IHashingHandler;
