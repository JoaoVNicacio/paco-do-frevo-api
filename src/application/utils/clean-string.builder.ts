/** The CleanStringBuilder class is a utility class that allows you to remove specific characters from a
string and build a clean version of the string. */
class CleanStringBuilder {
  private stringForEdition: string;

  private constructor(stringForEdition: string) {
    this.stringForEdition = stringForEdition;
  }

  /**
   * The method "fromString" creates a new instance of the CleanStringBuilder class using a given
   * string.
   * @param {string} stringForEdition - The parameter `stringForEdition` is a string that represents the
   * initial value of the CleanStringBuilder object.
   * @returns An instance of the CleanStringBuilder class.
   */
  public static fromString(stringForEdition: string): CleanStringBuilder {
    return new CleanStringBuilder(stringForEdition);
  }

  /**
   * The method removes dashes from a string.
   * @returns The method is returning the CleanStringBuilder instance itself.
   */
  public withoutDashes(): CleanStringBuilder {
    this.stringForEdition = this.stringForEdition.replace('-', '');
    return this;
  }

  /**
   * The method removes all dots from the string being edited and returns the modified string.
   * @returns The method is returning the CleanStringBuilder instance itself.
   */
  public withoutDots(): CleanStringBuilder {
    this.stringForEdition = this.stringForEdition.replace('.', '');
    return this;
  }

  /**
   * The method removes all slashes from the string being edited.
   * @returns The method is returning the CleanStringBuilder instance itself.
   */
  public withoutSlashes(): CleanStringBuilder {
    this.stringForEdition = this.stringForEdition.replace('/', '');
    return this;
  }

  /**
   * The "withoutSpaces" method removes all spaces from a string and returns a CleanStringBuilder
   * object.
   * @returns The method is returning the CleanStringBuilder instance itself.
   */
  public withoutSpaces(): CleanStringBuilder {
    this.stringForEdition = this.stringForEdition.replace(' ', '');
    return this;
  }

  /**
   * The build method returns the clean string.
   * @returns The method is returning a string value.
   */
  public build(): string {
    return this.stringForEdition;
  }
}

export default CleanStringBuilder;
