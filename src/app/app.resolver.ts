import { Resolver, Query } from '@nestjs/graphql';
//import { BaseRepository } from './repository';
//import { User } from './entities/user.entity';

@Resolver()
export class AppResolver {
  // constructor(){
  //   userService : BaseRepository<User>
  // }
  @Query(() => String)
  hello() {
    return 'Hello';
  }
}
