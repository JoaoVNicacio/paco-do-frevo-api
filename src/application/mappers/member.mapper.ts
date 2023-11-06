import { Injectable } from '@nestjs/common';
import Member from 'src/domain/entities/associationAggregate/member.entity';
import MemberDTO from '../dtos/associationDtos/member.dto';
import IMapper from './ientity.mapper';

@Injectable()
class MemberMapper implements IMapper<Member, MemberDTO> {
  public entityToDTO(entity: Member): MemberDTO {
    const dto = new MemberDTO();

    dto.name = entity.name;
    dto.surname = entity.surname;
    dto.role = entity.role;
    dto.actuationTimeInMonths = entity.actuationTimeInMonths;
    dto.isFrevoTheMainRevenueIncome = entity.isFrevoTheMainRevenueIncome;

    return dto;
  }

  public dtoToEntity(dto: MemberDTO): Member {
    const entity = new Member();

    entity.name = dto.name;
    entity.surname = dto.surname;
    entity.role = dto.role;
    entity.actuationTimeInMonths = dto.actuationTimeInMonths;
    entity.isFrevoTheMainRevenueIncome = dto.isFrevoTheMainRevenueIncome;
    entity.createdAt = new Date();
    entity.updatedAt = new Date();

    return entity;
  }
}

export default MemberMapper;
