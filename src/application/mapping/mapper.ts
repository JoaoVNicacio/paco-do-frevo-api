import { classes } from '@automapper/classes';
import { createMapper } from '@automapper/core';

/**
 * The constant `mapper`is an instance of the `Mapper` interface from `AutoMapper`.
 * This object serves the purpose of automapping objects mapped on the profiles it is called;
 */
const mapper = createMapper({
  strategyInitializer: classes(),
});

export default mapper;
