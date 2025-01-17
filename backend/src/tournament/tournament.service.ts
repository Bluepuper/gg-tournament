import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tournament } from './schemas/tournament.schema';
import {
  CreateTournamentInput,
  UpdateTournamentInput,
  FilterTournamentInput,
} from './dto/tournament.input';

@Injectable()
export class TournamentService {
  constructor(
    @InjectModel(Tournament.name) private tournamentModel: Model<Tournament>,
  ) {}

  async findAll(filter: FilterTournamentInput): Promise<Tournament[]> {
    return this.tournamentModel.find(filter).exec();
  }

  async findOneById(id: string): Promise<Tournament> {
    const tournament = await this.tournamentModel.findById(id).exec();
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
    return tournament;
  }

  async create(input: CreateTournamentInput): Promise<Tournament> {
    const createdTournament = new this.tournamentModel(input);
    return createdTournament.save();
  }

  async update(id: string, input: UpdateTournamentInput): Promise<Tournament> {
    return this.tournamentModel
      .findByIdAndUpdate(id, input, { new: true })
      .exec();
  }
}
