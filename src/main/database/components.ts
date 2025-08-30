import { BaseDatabaseService } from './base'
import { Component } from '../types/index'

export class ComponentsRepository extends BaseDatabaseService {
  async getComponents(): Promise<Component[] | null> {
    const db = this.ensureDb()
    await db.read()

    return db.data.components
  }

  async addComponent(
    componentData: Omit<Component, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Component> {
    const db = this.ensureDb()
    await db.read()

    const component: Component = {
      ...componentData,
      id: BaseDatabaseService.generateId(),
      createdAt: BaseDatabaseService.getCurrentTimestamp(),
      updatedAt: BaseDatabaseService.getCurrentTimestamp()
    }

    db.data.components.push(component)
    await db.write()
    return component
  }
}
