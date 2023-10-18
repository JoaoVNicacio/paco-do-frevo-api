interface IMapper<TEntity, TDto> {
  entityToDTO(entity: TEntity): TDto;
  dtoToEntity(dto: TDto): TEntity;
}

export default IMapper;
