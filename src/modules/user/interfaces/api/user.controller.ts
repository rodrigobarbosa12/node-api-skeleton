import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { CreateUserDto } from "src/modules/user/app/dtos/create-user.dto";
import { LoginUserDto } from "src/modules/user/app/dtos/login-user.dto";
import { CreateNewUserUseCase } from "src/modules/user/app/use-cases/create-new-user.use-case";
import { ListAllUsersUseCase } from "src/modules/user/app/use-cases/list-all-users.use-case";
import { LoginUseCase } from "src/modules/user/app/use-cases/login.use-case";
import { CreateForm } from "src/modules/user/interfaces/api/forms/create-form";
import { LoginForm } from "src/modules/user/interfaces/api/forms/login-form";
import { UserResponseDto } from "src/modules/user/interfaces/api/responses/list-users.response";
import { Public } from "src/shared/decorators/public-route";
import { AuthGuard } from "src/shared/guards/auth-guard";

@ApiTags("User")
@Controller("/user")
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly createNewUser: CreateNewUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly listAllUsersUseCase: ListAllUsersUseCase,
  ) {}

  @Post("/auth/create")
  @Public()
  @ApiBody({ type: CreateForm })
  async create(@Body() body: CreateForm): Promise<void> {
    const createUserDto = new CreateUserDto(body);
    await this.createNewUser.execute(createUserDto);
  }

  @Post("/auth/login")
  @Public()
  async login(@Body() body: LoginForm): Promise<string> {
    const loginDto = new LoginUserDto(body);
    return await this.loginUseCase.execute(loginDto);
  }

  @Get("/find")
  @ApiBearerAuth()
  @ApiOperation({ summary: "List all users" })
  @ApiOkResponse({ type: UserResponseDto })
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.listAllUsersUseCase.execute();

    return users.map((user) => plainToInstance(UserResponseDto, user));
  }
}
