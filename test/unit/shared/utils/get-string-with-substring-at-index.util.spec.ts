import { getStringWithSubstringAtIndex } from 'src/shared/utils/get-string-with-substring-at-index.util';

describe('getStringWithSubstringAtIndex function', () => {
  test('should insert substring at specified index', () => {
    // Arrange
    const input = 'Frevo é ';
    const substring = 'massa';
    const index = 8;

    // Act
    const result = getStringWithSubstringAtIndex(input, substring, index);

    // Assert
    expect(result).toBe('Frevo é massa');
  });

  test('should throw error if index is out of range', () => {
    // Arrange
    const input = 'Frevo é uma festa';
    const substring = 'fantástica ';
    const index = 20;

    // Act & Assert
    expect(() => {
      getStringWithSubstringAtIndex(input, substring, index);
    }).toThrow('Index out of range');
  });

  test('should handle inserting at the beginning of the string', () => {
    // Arrange
    const input = 'dançar';
    const substring = 'Frevo é ';

    // Act
    const result = getStringWithSubstringAtIndex(input, substring, 0);

    // Assert
    expect(result).toBe('Frevo é dançar');
  });

  test('should handle inserting at the end of the string', () => {
    // Arrange
    const input = 'Frevo é uma tradição ';
    const substring = 'muito forte';

    // Act
    const result = getStringWithSubstringAtIndex(
      input,
      substring,
      input.length,
    );

    // Assert
    expect(result).toBe('Frevo é uma tradição muito forte');
  });

  test('should handle inserting in an empty string', () => {
    // Arrange
    const input = '';
    const substring = 'Frevo é cultura ';

    // Act
    const result = getStringWithSubstringAtIndex(input, substring, 0);

    // Assert
    expect(result).toBe('Frevo é cultura ');
  });
});
