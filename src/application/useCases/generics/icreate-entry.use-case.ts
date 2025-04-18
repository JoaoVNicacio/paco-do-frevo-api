import ValidationResponse from 'src/shared/responseObjects/validation.response';

/**
 * Interface representing an asynchronous use case for creating entries.
 * @typeparam TEntity - The type of entity being created.
 * @typeparam TDTO - The type of data transfer object used for creating the entity.
 */
interface ICreateEntryAsyncUseCase<TEntity, TDTO> {
  /**
   * Creates an entry based on the provided data transfer object.
   * @param entryDTO - The data transfer object representing the entry to be created.
   * @returns A promise that resolves to a ValidationResponse containing the created entity.
   */
  createEntry(
    entryDTO: TDTO,
    userId?: string,
  ): Promise<ValidationResponse<TEntity>>;
}

export default ICreateEntryAsyncUseCase;
