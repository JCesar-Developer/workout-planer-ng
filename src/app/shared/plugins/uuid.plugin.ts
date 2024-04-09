import { v4 as uuid } from 'uuid';

export class IdGenerator {
  public static generateId(): string {
    return this.generateIdByUuid();
  }

  private static generateIdByUuid(): string {
    return uuid();
  }

  private static generateIdByRandomString(): string {
    return Math.random().toString(36).slice(2, 9);
  }
}
