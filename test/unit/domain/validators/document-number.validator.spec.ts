import DocumentNumberValidatorTemplate from 'src/domain/validators/document-number.validator';

describe('DocumentNumberValidatorTemplate', () => {
  let validator: DocumentNumberValidatorTemplate;

  beforeEach(() => {
    validator = new DocumentNumberValidatorTemplateMock();
  });

  it('should validate document number correctly', () => {
    expect(validator.validate('123-456')).toBe(true);
  });

  it('should validate document number correctly with slashes removed', () => {
    expect(validator.validate('12/34-56')).toBe(true);
  });

  it('should validate document number correctly with mixed separators removed', () => {
    expect(validator.validate('12.34/56-78')).toBe(true);
  });

  it('should invalidate document number with all same digits', () => {
    expect(validator.validate('111111')).toBe(false);
  });
});

class DocumentNumberValidatorTemplateMock extends DocumentNumberValidatorTemplate {
  protected validateSpecificRules(): boolean {
    // Adicione aqui a lógica específica para validar o número do documento
    return true;
  }
}
