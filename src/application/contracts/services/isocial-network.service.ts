import SocialNetworkDTO from 'src/application/dtos/associationDtos/social-network.dto';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import ICreateEntryForRootAsyncUseCase from 'src/application/useCases/generics/I-create-for-root.use-case';
import IDeleteEntryAsyncUseCase from 'src/application/useCases/generics/delete-entry.use-case';
import IGetByIdAsyncUseCase from 'src/application/useCases/generics/iget-by-id-async.use-case';
import IUpdateEntryAsyncUseCase from 'src/application/useCases/generics/iupdate-entry.use-case';
import SocialNetwork from 'src/domain/entities/associationAggregate/social-network.entity';

interface ISocialNetworkService
  extends IGetByIdAsyncUseCase<SocialNetwork, string>,
    ICreateEntryForRootAsyncUseCase<SocialNetwork, SocialNetworkDTO, string>,
    IUpdateEntryAsyncUseCase<SocialNetwork, SocialNetworkDTO, string>,
    IDeleteEntryAsyncUseCase<string> {
  createEntry(
    socialNetowrkDTO: SocialNetworkDTO,
    associationId: string,
  ): Promise<ValidationResponse<SocialNetwork>>;
  getById(id: string): Promise<SocialNetwork>;
  updateEntryById(
    id: string,
    socialNetworkDTO: SocialNetworkDTO,
  ): Promise<ValidationResponse<SocialNetwork>>;
  deleteEntryById(id: string): Promise<void>;
}

const ISocialNetworkService = Symbol('ISocialNetworkService');

export default ISocialNetworkService;
