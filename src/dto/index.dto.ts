import * as Joi from 'joi';
import { IsNumber, IsString } from 'class-validator';

export const indexJoiSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  work: Joi.string().required(),
});

export default class IndexDto {
  name: string;
  age: number;
  work: string;
}

export class SubIndexDto {
  @IsString()
  name: string;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;
}
