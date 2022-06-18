import ServerError from "./ServerError";

export default class PacketValidationError extends ServerError {
  public constructor(message: string) {
    super(message);

    this.name = 'PacketValidationError';
  }
}