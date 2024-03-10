/**
 * Interface representing an asynchronous use case for deleting entries by ID.
 * @typeparam TId - The type of identifier used to specify the entity to be deleted.
 */
interface IDeleteEntryAsyncUseCase<TId> {
  /**
   * Deletes an entry identified by the provided ID.
   * @param id - The identifier of the entry to be deleted.
   * @returns A promise that resolves when the deletion operation is complete.
   */
  deleteEntryById(id: TId): Promise<void>;
}

export default IDeleteEntryAsyncUseCase;
