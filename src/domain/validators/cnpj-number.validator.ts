import DocumentNumberValidatorTemplate from './document-number.validator';

/** The `CnpjNumberValidator` class is class that validates a given number against specific
rules for a CNPJ (Brazilian company identification number). */
class CnpjNumberValidator extends DocumentNumberValidatorTemplate {
  private readonly CNPJ_LENGTH: number = 14;
  private readonly FIRST_CHECKSUM_START_INDEX: number = 12;
  private readonly FIRST_CHECKSUM_FACTOR: number = 5;
  private readonly SECOND_CHECKSUM_START_INDEX: number = 13;
  private readonly SECOND_CHECKSUM_FACTOR: number = 6;
  private readonly CHECKSUM_MODULUS: number = 11;
  private readonly CNPJ_REGEX: RegExp = /^\d{14}$/;

  /**
   * The method validates a given number against specific rules for a CNPJ (Brazilian company
   * identification number).
   * @param {string} number - The `number` parameter is a string representing a CNPJ number.
   * @returns The method is returning a boolean value.
   */
  protected override validateSpecificRules(number: string): boolean {
    if (!this.CNPJ_REGEX.test(number)) {
      return false;
    }

    const digits = new Array<number>(this.CNPJ_LENGTH);

    for (let i = 0; i < this.CNPJ_LENGTH; i++) {
      digits[i] = parseInt(number[i]);
    }

    if (
      !this.ValidateCNPJChecksum(
        digits,
        this.FIRST_CHECKSUM_START_INDEX,
        this.FIRST_CHECKSUM_FACTOR,
      ) ||
      !this.ValidateCNPJChecksum(
        digits,
        this.SECOND_CHECKSUM_START_INDEX,
        this.SECOND_CHECKSUM_FACTOR,
      )
    ) {
      return false;
    }

    return true;
  }

  /** `ValidateCNPJChecksum` method is a private helper method used in the `CnpjNumberValidator` class
to validate the checksum of a CNPJ number. */
  private ValidateCNPJChecksum(
    digits: number[],
    startIndex: number,
    factor: number,
  ): boolean {
    let sum = 0;

    for (let i = 0; i < startIndex; i++) {
      sum += digits[i] * factor;
      factor = factor === 2 ? 9 : factor - 1;
    }

    const remainder = sum % this.CHECKSUM_MODULUS;

    if (remainder < 2) {
      return digits[startIndex] === 0;
    }

    return digits[startIndex] === this.CHECKSUM_MODULUS - remainder;
  }
}

export default CnpjNumberValidator;
