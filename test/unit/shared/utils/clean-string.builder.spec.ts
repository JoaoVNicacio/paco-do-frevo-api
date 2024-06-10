import CleanStringBuilder from 'src/shared/utils/clean-string.builder';

describe('CleanStringBuilder', () => {
  describe('withoutDashes', () => {
    it('should remove dashes from the string', () => {
      // Arrange
      const builder = CleanStringBuilder.fromString('test-string-with-dashes');

      // Act
      const result = builder.withoutDashes().build();

      // Assert
      expect(result).toBe('teststringwithdashes');
    });
  });

  describe('withoutDots', () => {
    it('should remove dots from the string', () => {
      // Arrange
      const builder = CleanStringBuilder.fromString('test.string.with.dots');

      // Act
      const result = builder.withoutDots().build();

      // Assert
      expect(result).toBe('teststringwithdots');
    });
  });

  describe('withoutSlashes', () => {
    it('should remove slashes from the string', () => {
      // Arrange
      const builder = CleanStringBuilder.fromString('test/string/with/slashes');

      // Act
      const result = builder.withoutSlashes().build();

      // Assert
      expect(result).toBe('teststringwithslashes');
    });
  });

  describe('withoutSpaces', () => {
    it('should remove spaces from the string', () => {
      // Arrange
      const builder = CleanStringBuilder.fromString('test string with spaces');

      // Act
      const result = builder.withoutSpaces().build();

      // Assert
      expect(result).toBe('teststringwithspaces');
    });
  });

  describe('withoutUnnecessarySpaces', () => {
    it('should remove unnecessary spaces from the string', () => {
      // Arrange
      const builder = CleanStringBuilder.fromString(
        'test    string    with    multiple    spaces',
      );

      // Act
      const result = builder.withoutUnnecessarySpaces().build();

      // Assert
      expect(result).toBe('test string with multiple spaces');
    });
  });

  describe('fromString', () => {
    it('should handle null input', () => {
      // Arrange & Act
      const builder = CleanStringBuilder.fromString(null);

      // Assert
      expect(builder.build()).toBe('');
    });

    it('should handle undefined input', () => {
      // Arrange & Act
      const builder = CleanStringBuilder.fromString(undefined);

      // Assert
      expect(builder.build()).toBe('');
    });

    it('should handle empty string input', () => {
      // Arrange & Act
      const builder = CleanStringBuilder.fromString('');

      // Assert
      expect(builder.build()).toBe('');
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of the string', () => {
      // Arrange
      const builder = CleanStringBuilder.fromString('test string');

      // Act
      const result = builder.capitalizeFirstLetter().build();

      // Assert
      expect(result).toBe('Test string');
    });

    it('should handle empty string', () => {
      // Arrange
      const builder = CleanStringBuilder.fromString('');

      // Act
      const result = builder.capitalizeFirstLetter().build();

      // Assert
      expect(result).toBe('');
    });
  });

  describe('toInitCap', () => {
    it('should capitalize the first letter of each word', () => {
      // Arrange
      const builder = CleanStringBuilder.fromString('test string with words');

      // Act
      const result = builder.toInitCap().build();

      // Assert
      expect(result).toBe('Test String With Words');
    });

    it('should ignore prepositions when shouldIgnorePrepositions is true', () => {
      // Arrange
      const builder = CleanStringBuilder.fromString('a casa do sol');

      // Act
      const result = builder.toInitCap(true).build();

      // Assert
      expect(result).toBe('A Casa do Sol');
    });
  });
});
