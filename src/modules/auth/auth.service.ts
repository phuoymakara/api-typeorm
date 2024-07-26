/* eslint-disable prettier/prettier */
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { User } from 'src/entities/user.entity';
import { Hash } from 'src/utils/Hash';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getAll() {
    try {
      return await this.userRepository.find({});
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async validate(email: string, password: string){
    const user = await this.userRepository.findOne({
      where: {
        email : email,
        password : await Hash.make(password)
      }
    })
    this.logger.log('Validate User',user)
    if(!user) {
      throw new GraphQLError('User not found', {
        extensions: {
          code: 404
        }
      })
    }
    return user;
  }
}
