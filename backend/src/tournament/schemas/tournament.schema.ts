import { Document } from 'mongoose';
import {
  Prop,
  SchemaFactory,
  Schema as SchemaDecorator,
} from '@nestjs/mongoose';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum TournamentStatus {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
}

registerEnumType(TournamentStatus, {
  name: 'TournamentStatus',
});

@ObjectType()
@SchemaDecorator()
export class Tournament extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => TournamentStatus)
  @Prop({ enum: TournamentStatus, default: TournamentStatus.UPCOMING })
  status: TournamentStatus;
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
