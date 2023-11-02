import * as Joi from 'joi';
import Association from '../association.entity';
import IEntityValidation from '../../entityInterfaces/validations/ientity.validation';

class AssociationValidation implements IEntityValidation<Association> {
  private schema: Joi.ObjectSchema;

  constructor() {
    this.schema = Joi.object({
      name: Joi.string().required(),
      foundationDate: Joi.date().iso().required(),
      colors: Joi.array().items(Joi.string()),
      associationType: Joi.string().required(),
      activeMembers: Joi.number().integer().min(0).required(),
      isSharedWithAResidence: Joi.boolean().required(),
      hasOwnedHeadquarters: Joi.boolean().required(),
      isLegalEntity: Joi.boolean().required(),
      cnpj: Joi.string().allow(null).optional(),
      canIssueOwnReceipts: Joi.boolean().required(),
      associationHistoryNotes: Joi.string().required(),
      createdAt: Joi.date().iso(),
      updatedAt: Joi.date().iso(),
      createdBy: Joi.string().uuid(),
      updatedBy: Joi.string().uuid(),
    });
  }

  public validate(entity: Association): Joi.ValidationResult {
    return this.schema.validate(entity);
  }
}

export default AssociationValidation;
