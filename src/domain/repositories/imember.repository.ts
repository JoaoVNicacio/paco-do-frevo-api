import Member from '../entities/associationAggregate/member.entity';

interface IMemberRepository {
  createResume(member: Member): Promise<Member>;
  findById(id: string): Promise<Member | undefined>;
  updateAssociation(id: string, member: Member): Promise<Member | undefined>;
  deleteAssociation(id: string): Promise<void>;
}

export default IMemberRepository;
