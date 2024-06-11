import ValidationResponse from 'src/shared/responseObjects/validation.response';

/**
 * Interface representing an asynchronous use case for updating entries by ID.
 * @typeparam TEntity - The type of entity being updated.
 * @typeparam TDTO - The type of data transfer object used for updating the entity.
 * @typeparam TId - The type of identifier used to specify the entity to be updated.
 */
interface IUpdateEntryAsyncUseCase<TEntity, TDTO, TId> {
  /**
   * Updates an entry identified by the provided ID, based on the provided data transfer object.
   * @param id - The identifier of the entry to be updated.
   * @param entryDTO - The data transfer object representing the updated entry.
   * @returns A promise that resolves to a ValidationResponse containing the updated entity.
   */
  updateEntryById(
    id: TId,
    entryDTO: TDTO,
  ): Promise<ValidationResponse<TEntity>>;
}

export default IUpdateEntryAsyncUseCase;
