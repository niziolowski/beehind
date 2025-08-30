import { BaseDatabaseService } from './base'
import { ThemeRepository } from './theme'
import { ShopifyRepository } from './shopify'
import { ComponentsRepository } from './components'

export class DatabaseService extends BaseDatabaseService {
  private themeRepo: ThemeRepository
  private shopifyRepo: ShopifyRepository
  private componentsRepo: ComponentsRepository

  constructor() {
    super()
    this.themeRepo = new ThemeRepository()
    this.shopifyRepo = new ShopifyRepository()
    this.componentsRepo = new ComponentsRepository()
  }

  async initialize(): Promise<void> {
    // Initialize the base database
    await super.initialize()

    // Share the database connection with all repositories
    this.themeRepo.db = this.db
    this.themeRepo.Low = this.Low
    this.themeRepo.JSONFile = this.JSONFile

    this.shopifyRepo.db = this.db
    this.shopifyRepo.Low = this.Low
    this.shopifyRepo.JSONFile = this.JSONFile

    this.componentsRepo.db = this.db
    this.componentsRepo.Low = this.Low
    this.componentsRepo.JSONFile = this.JSONFile
  }

  // Expose repository instances
  get theme(): ThemeRepository {
    return this.themeRepo
  }

  get shopify(): ShopifyRepository {
    return this.shopifyRepo
  }

  get components(): ComponentsRepository {
    return this.componentsRepo
  }
}

// Export singleton instance
export const databaseService = new DatabaseService()

// Export everything else
export { BaseDatabaseService } from './base'
export { ThemeRepository } from './theme'
export { ShopifyRepository } from './shopify'
export { ComponentsRepository } from './components'
