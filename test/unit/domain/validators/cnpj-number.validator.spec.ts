import CnpjNumberValidator from 'src/domain/validators/cnpj-number.validator';

describe('CnpjNumberValidator', () => {
  // ----- Tests -------

  describe('Valid cnpjs should return all true', () => {
    it('should return true for a valid CNPJ', () => {
      // Arrange:
      const validator = new CnpjNumberValidator();
      const validCnpjs = [
        '72170322000190',
        '13062108000150',
        '31783106000132',
        '93568693000102',
        '25626856000106',
        '91851731000104',
        '21333342000101',
        '06745842000159',
        '81128724000117',
        '15092505000109',
      ];

      // Act
      const testResult = validCnpjs.every((cnpj) => validator.validate(cnpj));

      // Assertions:
      expect(testResult).toBe(true);
    });

    it('should return false for an invalid CNPJ', () => {
      // Arrange:
      const validator = new CnpjNumberValidator();
      const invalidCnpj = '11222333000180';

      // Assertions:
      expect(validator.validate(invalidCnpj)).toBe(false);
    });

    it('should return false for CNPJ with wrong length', () => {
      // Arrange:
      const validator = new CnpjNumberValidator();
      const invalidCnpj = '1122233300';

      // Assertions:
      expect(validator.validate(invalidCnpj)).toBe(false);
    });

    it('should return false for CNPJ with non-digit characters', () => {
      // Arrange:
      const validator = new CnpjNumberValidator();
      const invalidCnpj = '11A22333000180';

      // Assertions:
      expect(validator.validate(invalidCnpj)).toBe(false);
    });

    it('should return false for every CNPJs with the all same digits', () => {
      // Arrange:
      const validator = new CnpjNumberValidator();
      const invalidCnpjs = [
        '11111111111111',
        '22222222222222',
        '33333333333333',
        '44444444444444',
        '55555555555555',
        '66666666666666',
        '77777777777777',
        '88888888888888',
        '99999999999999',
        '00000000000000',
        'aaaaaaaaaaaaaa',
      ];

      // Act
      const testResult = invalidCnpjs.every((cnpj) => validator.validate(cnpj));

      // Assertions:
      expect(testResult).toBe(false);
    });
  });
});
