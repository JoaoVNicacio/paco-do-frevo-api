import Association from 'src/domain/aggregates/associationAggregate/association.entity';
import AssociationValidator from '../../../../src/application/validation/association.validator';

describe('Association', () => {
  let association: Association;

  beforeEach(() => {
    association = new Association();
  });

  describe('validateCreation', () => {
    it('should return an empty array if association is valid', async () => {
      // Arrange
      association.name = 'Test Association';
      association.foundationDate = new Date('2020-01-01');
      association.colors = ['Red', 'Blue'];
      association.associationType = 'Troça';
      association.activeMembers = 100;
      association.isSharedWithAResidence = false;
      association.hasOwnedHeadquarters = true;
      association.isLegalEntity = false;
      association.canIssueOwnReceipts = true;
      association.associationHistoryNotes = 'Test history';

      // Act
      association.validationDelegate = new AssociationValidator().validate.bind(
        new AssociationValidator(),
      );

      const errors = await association.validateEntity();

      // Assert
      expect(errors).toHaveLength(0);
    });

    it('should return validation errors if association is invalid', async () => {
      // Arrange
      // Here we're not setting any required fields intentionally to make the association invalid

      // Act
      association.validationDelegate = new AssociationValidator().validate.bind(
        new AssociationValidator(),
      );

      const errors = await association.validateEntity();

      // Assert
      expect(errors).not.toHaveLength(0);
    });
  });

  describe('isValid', () => {
    it('should return true if association is valid', async () => {
      // Arrange
      association.name = 'Test Association';
      association.foundationDate = new Date('2020-01-01');
      association.colors = ['Red', 'Blue'];
      association.associationType = 'Troça';
      association.activeMembers = 100;
      association.isSharedWithAResidence = false;
      association.hasOwnedHeadquarters = true;
      association.isLegalEntity = false;
      association.canIssueOwnReceipts = true;
      association.associationHistoryNotes = 'Test history';

      // Act
      association.validationDelegate = new AssociationValidator().validate.bind(
        new AssociationValidator(),
      );

      const isValid = await association.isValid();

      // Assert
      expect(isValid).toBe(true);
    });

    it('should return false if association is invalid', async () => {
      // Arrange
      // Here we're not setting any required fields intentionally to make the association invalid

      // Act
      association.validationDelegate = new AssociationValidator().validate.bind(
        new AssociationValidator(),
      );

      const isValid = await association.isValid();

      // Assert
      expect(isValid).toBe(false);
    });
  });
});
