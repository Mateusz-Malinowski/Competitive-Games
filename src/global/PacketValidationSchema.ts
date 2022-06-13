export default interface PacketValidationSchema {
  type: { required: true, type: 'number' };
  [field: string]: PacketConstraint;
}

interface PacketConstraint {
  required: boolean;
  type: string;
}