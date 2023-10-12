import {
  Body,
  Controller,
  Post,
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './decorator/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  // @SetMetadata('isPublic', true)
  @Public()
  register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    console.log('register api');
    console.log(registerUserDto);
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  // @SetMetadata('isPublic', true)
  @Public()
  @ApiResponse({ status: 201, description: 'Login successfully!' })
  @ApiResponse({ status: 401, description: 'Login fail!' })
  @UsePipes(ValidationPipe)
  login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    console.log('login');
    console.log(loginUserDto);

    return this.authService.login(loginUserDto);
  }

  @Post('refresh-token')
  // @SetMetadata('isPublic', true)
  @Public()
  refreshToken(@Body() { refresh_token }): Promise<any> {
    console.log('refresh token api');
    return this.authService.refreshToken(refresh_token);
  }
}
