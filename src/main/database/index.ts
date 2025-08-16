import { BaseDatabaseService } from './base'
import { SettingsRepository } from './settings'

export class DatabaseService extends BaseDatabaseService {
  private settingsRepo: SettingsRepository

  constructor() {
    super()
    this.settingsRepo = new SettingsRepository()
  }

  async initialize(): Promise<void> {
    // Initialize the base database
    await super.initialize()

    // Share the database connection with all repositories
    this.settingsRepo.db = this.db
    this.settingsRepo.Low = this.Low
    this.settingsRepo.JSONFile = this.JSONFile
  }

  // Expose repository instances
  get settings(): SettingsRepository {
    return this.settingsRepo
  }
}

// Export singleton instance
export const databaseService = new DatabaseService()

// Export everything else
export { BaseDatabaseService } from './base'
export { SettingsRepository } from './settings'
