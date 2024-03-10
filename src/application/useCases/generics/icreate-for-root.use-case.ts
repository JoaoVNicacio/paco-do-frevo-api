import ValidationResponse from 'src/application/responseObjects/validation.response';

/**
 * Interface representing an asynchronous use case for creating entries.
 * @typeparam TEntity - The type of entity being created.
 * @typeparam TDTO - The type of data transfer object used for creating the entity.
 * @typeparam TId - The type of identifier used to specify the root entity.
 */
interface ICreateEntryForRootAsyncUseCase<TEntity, TDTO, TId> {
  /**
   * Creates an entry based on the provided data transfer object.
   * @param entryDTO - The data transfer object representing the entry to be created.
   * @param rootId - The id of the root entity.
   * @returns A promise that resolves to a ValidationResponse containing the created entity.
   */
  createEntry(
    entryDTO: TDTO,
    rootId: TId,
  ): Promise<ValidationResponse<TEntity>>;
}

export default ICreateEntryForRootAsyncUseCase;
