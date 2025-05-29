import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DataSourceModule } from 'src/data-source/data-source.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DataSourceModule],
})
export class UsersModule {}
