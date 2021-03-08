import { Column, Entity } from "typeorm";

@Entity()
export class UserInfo {
  @Column()
  userId: string;

  familyName: string;

  givenName: string;


}
