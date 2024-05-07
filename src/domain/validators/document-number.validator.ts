import CleanStringBuilder from 'src/shared/utils/clean-string.builder';

/** The abstract class called `DocumentNumberValidatorTemplate`
provides a template for validating document numbers based on specific rules. */
abstract class DocumentNumberValidatorTemplate {
  /**
   * The function "validate" checks if a given number is
   * valid based on specific rules.
   * @param {string} number - The parameter "number" is
   * of type string and represents the number that needs
   * to be validated.
   * @returns The method `validate` returns a boolean
   * value.
   */
  public validate(number: string): boolean {
    number = CleanStringBuilder.fromString(number)
      .withoutDashes()
      .withoutDots()
      .withoutSlashes()
      .build();

    if (this.hasAllSameDigits(number)) {
      return false;
    }

    return this.validateSpecificRules(number);
  }

  /* The line `protected abstract validateSpecificRules(number: string): boolean;` is declaring an
 abstract method called `validateSpecificRules` in the `DocumentNumberValidatorTemplate` class. */
  protected abstract validateSpecificRules(number: string): boolean;

  /**
   * The function checks if all the digits in a given number are the same.
   * @param {string} number - The `number` parameter is a string representing a number.
   * @returns a boolean value. It returns true if all the digits in the input number are the same, and
   * false otherwise.
   */
  protected hasAllSameDigits(number: string): boolean {
    for (const char of number) {
      if (char !== number[0]) {
        return false;
      }
    }

    return true;
  }
}

export default DocumentNumberValidatorTemplate;
