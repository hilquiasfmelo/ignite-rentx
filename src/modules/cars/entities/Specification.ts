import { v4 as uuidV4 } from 'uuid';

class Specification {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor() {
    this.id = uuidV4();
  }
}

export { Specification };
