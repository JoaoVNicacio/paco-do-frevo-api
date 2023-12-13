/** The `IMapper` interface defines a contract for a mapper that converts between two types: `TEntity`
and `TDto`. It declares two methods:
entityToDTO: parses an entity to a dto.
dtoToEntity: parses a dto to an entity.
*/
interface IMapper<TEntity, TDto> {
  /** The `entityToDTO(entity: TEntity): TDto;` method is a function that takes an `entity` of type
  `TEntity` as a parameter and returns a value of type `TDto`. It is responsible for converting an
  entity object to a DTO (Data Transfer Object) object. */
  entityToDTO(entity: TEntity): TDto;
  /** The `dtoToEntity(dto: TDto): TEntity;` method is a function that takes a `dto` of type `TDto` as a
  parameter and returns a value of type `TEntity`. It is responsible for converting a DTO (Data
  Transfer Object) object to an entity object. */
  dtoToEntity(dto: TDto): TEntity;
}

export default IMapper;
