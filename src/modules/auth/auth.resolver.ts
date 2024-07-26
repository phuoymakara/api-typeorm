import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private userService: AuthService) {}

  @Query(() => User)
  getUsers() {
    return this.userService.getAll();
  }

  @Query(() => String)
  @Public()
  getHello(){
    return 'This hello'
  }
}
