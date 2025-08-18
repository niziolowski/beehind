import { app } from 'electron'
import path from 'path'

export class BaseDatabaseService {
  public db: {
    data: DatabaseSchema | null
    read: () => Promise<void>
    write: () => Promise<void>
  } | null = null
  public Low: any | null = null
  public JSONFile: any | null = null
  protected dbPath: string

  constructor() {
    // Store database in user data directory
    const userDataPath = app.getPath('userData')
    this.dbPath = path.join(userDataPath, 'beehind-database.json')
  }

  protected async loadLowDB() {
    if (!this.Low || !this.JSONFile) {
      const lowdb = await import('lowdb')
      const lowdbNode = await import('lowdb/node')
      this.Low = lowdb.Low
      this.JSONFile = lowdbNode.JSONFile
    }
  }

  async initialize(): Promise<void> {
    try {
      await this.loadLowDB()

      const adapter = new this.JSONFile(this.dbPath)
      this.db = new this.Low(adapter, {})

      if (!this.db) throw new Error('Failed to ensure database instance.')

      await this.db.read()

      // Initialize with default data if database is empty
      if (!this.db.data) {
        this.db.data = {
          settings: {
            shopifyToken: null,
            theme: {
              mode: 'system',
              palette: 'mono'
            }
          }
        }
        await this.db.write()
      }

      // eslint-disable-next-line no-console
      console.log(`Database initialized at: ${this.dbPath}`)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to initialize database:', error)
      throw error
    }
  }

  protected ensureDb(): {
    data: DatabaseSchema
    read: () => Promise<void>
    write: () => Promise<void>
  } {
    if (!this.db || !this.db.data) {
      throw new Error('Database not initialized. Call initialize() first.')
    }
    return this.db as {
      data: DatabaseSchema
      read: () => Promise<void>
      write: () => Promise<void>
    }
  }

  // Utility methods
  protected static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  protected static getCurrentTimestamp(): string {
    return new Date().toISOString()
  }

  // Common database operations
  async backup(): Promise<string> {
    const db = this.ensureDb()
    await db.read()

    const backupPath = path.join(path.dirname(this.dbPath), `backup-${Date.now()}.json`)

    await this.loadLowDB()
    const backupAdapter = new this.JSONFile(backupPath)
    const backupDb = new this.Low(backupAdapter, db.data)
    await backupDb.write()

    return backupPath
  }

  async exportData(): Promise<DatabaseSchema> {
    const db = this.ensureDb()
    await db.read()
    return JSON.parse(JSON.stringify(db.data))
  }

  async importData(data: DatabaseSchema): Promise<void> {
    const db = this.ensureDb()

    // Ensure all required collections exist in the imported data
    const normalizedData = {
      settings: data.settings || {}
    }

    db.data = normalizedData
    await db.write()
  }

  getDatabasePath(): string {
    return this.dbPath
  }
}
