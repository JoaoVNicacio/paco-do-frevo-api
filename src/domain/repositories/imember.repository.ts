import Member from '../aggregates/associationAggregate/member.entity';

interface IMemberRepository {
  createMember(member: Member): Promise<Member>;
  findById(id: string): Promise<Member | undefined>;
  updateAssociation(id: string, member: Member): Promise<Member | undefined>;
  deleteAssociation(id: string): Promise<void>;
}

export default IMemberRepository;
