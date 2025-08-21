import { BaseDatabaseService } from './base'
import { SettingsRepository } from './settings'
import { ShopifyRepository } from './shopify'

export class DatabaseService extends BaseDatabaseService {
  private settingsRepo: SettingsRepository
  private shopifyRepo: ShopifyRepository

  constructor() {
    super()
    this.settingsRepo = new SettingsRepository()
    this.shopifyRepo = new ShopifyRepository()
  }

  async initialize(): Promise<void> {
    // Initialize the base database
    await super.initialize()

    // Share the database connection with all repositories
    this.settingsRepo.db = this.db
    this.settingsRepo.Low = this.Low
    this.settingsRepo.JSONFile = this.JSONFile

    this.shopifyRepo.db = this.db
    this.shopifyRepo.Low = this.Low
    this.shopifyRepo.JSONFile = this.JSONFile
  }

  // Expose repository instances
  get settings(): SettingsRepository {
    return this.settingsRepo
  }

  get shopify(): ShopifyRepository {
    return this.shopifyRepo
  }
}

// Export singleton instance
export const databaseService = new DatabaseService()

// Export everything else
export { BaseDatabaseService } from './base'
export { SettingsRepository } from './settings'
export { ShopifyRepository } from './shopify'
