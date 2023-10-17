interface IAddress {
  id: string;
  addressSite: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  setCreationStamps(userId: string): void;
  setUpdateStamps(userId: string): void;
  isValid(): boolean;
}

export default IAddress;
