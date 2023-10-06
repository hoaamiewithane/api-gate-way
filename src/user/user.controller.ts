import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/auth.adminGuard';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list-user')
  findAll(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('searchTerm') searchTerm?: string,
    @Query('role') role?: 'admin' | 'user',
  ) {
    if (isNaN(limit) || isNaN(offset)) {
      throw new HttpException(
        'Limit and offset must be numbers',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (role && !['admin', 'user'].includes(role)) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
    try {
      return this.userService.findAll({
        limit,
        offset,
        searchTerm,
        role,
      });
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

  @UseGuards(AdminGuard)
  @Patch(':id')
  editUser(@Param('id') id: string, @Body() editUserDto: EditUserDto) {
    try {
      return this.userService.editUser(+id, editUserDto);
    } catch (err) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
