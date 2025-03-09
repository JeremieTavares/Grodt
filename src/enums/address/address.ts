export enum AddressType {
  PERSONAL = "PERSONAL",
  WORK = "WORK",
}

export const ADDRESS_TYPE_LABELS: Record<AddressType, string> = {
  [AddressType.PERSONAL]: "Personnelle",
  [AddressType.WORK]: "Travail",
};
