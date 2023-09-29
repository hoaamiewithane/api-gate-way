import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/auth.adminGuard';
import { UserService } from './user.service';

@UseGuards(AdminGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list-user')
  findAll(
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('offset', ParseIntPipe) offset: number = 0,
    @Query('searchTerm') searchTerm?: string,
  ) {
    try {
      return this.userService.findAll({ limit, offset, searchTerm });
    } catch (err) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(+id);
    } catch (err) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
