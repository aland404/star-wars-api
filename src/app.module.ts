import {Module} from '@nestjs/common';
import {PeopleController} from "./people/infrastructure/controller/people.controller";
import {InMemoryPeopleRepository} from "./people/infrastructure/people.repository";
import {PeopleRepository} from "./people/domain/peopleRepository.interface";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [PeopleController],
  providers: [{provide: PeopleRepository, useClass: InMemoryPeopleRepository}],
})
export class AppModule {}
