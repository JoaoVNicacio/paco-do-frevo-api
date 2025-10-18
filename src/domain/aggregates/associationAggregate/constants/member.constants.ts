import ERoles from '../enums/eroles.enum';

class MemberConstants {
  public static readonly MEMBER_TYPES: Array<string> = [
    ERoles.president,
    ERoles.artisan,
    ERoles.musician,
    ERoles.dancer,
  ];
}

export default MemberConstants;
