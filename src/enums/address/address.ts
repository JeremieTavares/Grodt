export enum Country {
  CA = "CA",
}

export enum AddressType {
  PERSONAL = "PERSONAL",
  WORK = "WORK",
}

export const COUNTRY_LABELS: Record<Country, string> = {
  [Country.CA]: "Canada",
};

export const ADDRESS_TYPE_LABELS: Record<AddressType, string> = {
  [AddressType.PERSONAL]: "Personnelle",
  [AddressType.WORK]: "Travail",
};
