import { Request } from 'express';
import IJwtPayload from 'src/shared/requestObjects/ijwt.payload';

interface IRequestWithUser extends Request {
  user: IJwtPayload;
}

export default IRequestWithUser;
