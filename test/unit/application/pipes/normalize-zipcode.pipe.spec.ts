import AddressDTO from 'src/application/dtos/addressDTOs/address.dto';
import NormalizeZipCodePipe from 'src/application/pipes/normalize-zipcode.pipe';
import IAddress from 'src/domain/entityInterfaces/iaddress.entity-base';

describe('NormalizeZipCodePipe', () => {
  let pipe: NormalizeZipCodePipe;

  beforeEach(() => {
    pipe = new NormalizeZipCodePipe();
  });

  it('should add hyphen to zip code if missing', () => {
    // Arrange:
    const address = { zipCode: '12345678' } as IAddress;

    // Act:
    const transformedZipCode = pipe.transform(address);

    // Assert:
    expect(transformedZipCode).toBe('12345-678');
  });

  it('should not modify zip code if hyphen is already present at 6th position', () => {
    // Arrange:
    const address = { zipCode: '12345-678' } as IAddress;

    // Act:
    const transformedZipCode = pipe.transform(address);

    // Assert:
    expect(transformedZipCode).toBe('12345-678');
  });

  it('should handle shorter zip codes correctly', () => {
    // Arrange:
    const address: IAddress = { zipCode: '12345' } as IAddress;

    // Act:
    const transformedZipCode = pipe.transform(address);

    // Assert:
    expect(transformedZipCode).toBe('12345-');
  });

  it('should handle longer zip codes without hyphen at 6th position correctly', () => {
    // Arrange:
    const address = { zipCode: '12345678' } as IAddress;

    // Act:
    const transformedZipCode = pipe.transform(address);

    // Assert:
    expect(transformedZipCode).toBe('12345-678');
  });

  it('should handle AddressDTO objects correctly', () => {
    // Arrange:
    const addressDTO: AddressDTO = new AddressDTO();
    addressDTO.zipCode = '12345678';

    // Act:
    const transformedZipCode = pipe.transform(addressDTO);

    // Assert:
    expect(transformedZipCode).toBe('12345-678');
  });
});
