/* The `IMapper` interface defines a contract for a mapper that converts between two types: `TEntity`
and `TDto`. It declares two methods:
entityToDTO: parses an entity to a dto.
dtoToEntity: parses a dto to an entity.
*/
interface IMapper<TEntity, TDto> {
  entityToDTO(entity: TEntity): TDto;
  dtoToEntity(dto: TDto): TEntity;
}

export default IMapper;
