import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;
}
