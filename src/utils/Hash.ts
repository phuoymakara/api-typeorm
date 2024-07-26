import * as bcrypt from 'bcrypt';

export class Hash{
  //make
  static async make(plainText: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hashSync(plainText, salt);
  }

  //compare
  static async compare(plainText: string, hash: string) {
    return await bcrypt.compare(plainText, hash);
  }

}