import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private userService: AuthService) {}

  @Query(() => User)
  getUsers() {
    return this.userService.getAll();
  }
}
