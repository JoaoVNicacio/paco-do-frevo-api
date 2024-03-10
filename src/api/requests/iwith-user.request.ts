import { Request } from 'express';
import IJwtPayload from 'src/application/requestObjects/ijwt.payload';

interface IRequestWithUser extends Request {
  user: IJwtPayload;
}

export default IRequestWithUser;
