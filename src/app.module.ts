import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {WarController} from "./war/infrastructure/controller/war.controller";
import {WarRepository} from "./war/domain";
import {InMemoryWarsRepository} from "./war/infrastructure/war.repository";
import {PeopleRepository} from "./people/domain/peopleRepository.interface";
import {InMemoryPeopleRepository} from "./people/infrastructure/people.repository";
import {PeopleController} from "./people/infrastructure/controller/people.controller";

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [PeopleController, WarController],
    providers: [{provide: PeopleRepository, useClass: InMemoryPeopleRepository}, {
        provide: WarRepository,
        useClass: InMemoryWarsRepository
    }],
})
export class AppModule {
}
