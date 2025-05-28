import { WithUuid } from 'src/common/mixins/with-uuid.mixin';

export class Coffee {
  constructor(public name: string) {}
}

const CoffeeWithUuidClass = WithUuid(Coffee);
const coffee = new CoffeeWithUuidClass('Buddy Brew');
