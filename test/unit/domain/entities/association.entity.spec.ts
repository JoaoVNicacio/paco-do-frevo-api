import Association from 'src/domain/aggregates/associationAggregate/association.entity';

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
      const errors = await association.validateCreation();

      // Assert
      expect(errors).toHaveLength(0);
    });

    it('should return validation errors if association is invalid', async () => {
      // Arrange
      // Here we're not setting any required fields intentionally to make the association invalid

      // Act
      const errors = await association.validateCreation();

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
      const isValid = await association.isValid();

      // Assert
      expect(isValid).toBe(true);
    });

    it('should return false if association is invalid', async () => {
      // Arrange
      // Here we're not setting any required fields intentionally to make the association invalid

      // Act
      const isValid = await association.isValid();

      // Assert
      expect(isValid).toBe(false);
    });
  });
});
