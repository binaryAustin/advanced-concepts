import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';

export function EntityExistsPipe(entityClass: Type): Type<PipeTransform> {
  @Injectable()
  class EntityExistsPipeClass implements PipeTransform {
    constructor(
      @Inject(entityClass)
      private entityRepository: {
        exists: (condition: unknown) => Promise<void>;
      },
    ) {}

    async transform(value: any, metadata: ArgumentMetadata) {
      await this.entityRepository.exists({ where: { id: value } });
      return value;
    }
  }
  return EntityExistsPipeClass;
}
