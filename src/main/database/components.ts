import { BaseDatabaseService } from './base'
import { Component } from '../types/database'

export class ComponentsRepository extends BaseDatabaseService {
  async getComponents(): Promise<Component[] | null> {
    const db = this.ensureDb()
    await db.read()

    return db.data.components
  }
}
