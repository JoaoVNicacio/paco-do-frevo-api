import AssociationFilteringParam from 'src/shared/requestObjects/params/association.filtering-param';
import EAssociationType from 'src/domain/aggregates/associationAggregate/enums/eassociation-type.enum';
import AssociationFilteringParamPipe from 'src/application/pipes/association.filtering-param.pipe';

describe('AssociationFilteringParamPipe', () => {
  let pipe: AssociationFilteringParamPipe;

  beforeEach(() => {
    pipe = new AssociationFilteringParamPipe();
  });

  it('should transform valid AssociationFilteringParam', () => {
    // Arrange
    const associationFilteringParam = new AssociationFilteringParam();
    associationFilteringParam.searchParam = 'Test';
    associationFilteringParam.associationType = EAssociationType.puppetClub;
    associationFilteringParam.district = 'Downtown';
    associationFilteringParam.city = 'Metropolis';
    associationFilteringParam.state = 'Wonderland';
    associationFilteringParam.minMemberAmmount = 5;
    associationFilteringParam.maxMemberAmmount = 100;

    // Act
    const transformedParam = pipe.transform(associationFilteringParam);

    // Assert
    expect(transformedParam).toEqual(associationFilteringParam);
  });

  it('should transform undefined to default AssociationFilteringParam', () => {
    // Act
    const transformedParam = pipe.transform(undefined);

    // Assert
    expect(transformedParam).toBeNull();
  });

  it('should transform null to default AssociationFilteringParam', () => {
    // Act
    const transformedParam = pipe.transform(null);

    // Assert
    expect(transformedParam).toBeNull();
  });

  it('should transform invalid AssociationFilteringParam properties to default values', () => {
    // Arrange
    const invalidParams = {
      searchParam: 123,
      associationType: 'InvalidType',
      district: 123,
      city: true,
      state: ['State1', 'State2'],
      minMemberAmmount: 'abc',
      maxMemberAmmount: {},
    };

    // Act
    const transformedParam = pipe.transform(invalidParams);

    // Assert
    expect(transformedParam.searchParam).toBeUndefined();
    expect(transformedParam.associationType).toBeUndefined();
    expect(transformedParam.district).toBeUndefined();
    expect(transformedParam.city).toBeUndefined();
    expect(transformedParam.state).toBeUndefined();
    expect(transformedParam.minMemberAmmount).toBeUndefined();
    expect(transformedParam.maxMemberAmmount).toBeUndefined();
  });
});
