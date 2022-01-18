export class Rolemap {
  id: number;
  username: string;
  account: number;
  active: boolean;
  roles: { id: number, name: string, description: string}[];
}
