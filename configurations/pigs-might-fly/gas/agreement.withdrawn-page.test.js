import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const agreement = JSON.parse(
  readFileSync(new URL('./agreement.json', import.meta.url))
)

describe('Pigs Might Fly withdrawn agreement page', () => {
  it('declares its terminal-state content in an explicit component tree', () => {
    const page = agreement.pages.withdrawn

    expect(page.actions).toEqual([])
    expect(page.components).toHaveLength(1)
    expect(page.components[0].component).toBe('grid-row')

    const column = page.components[0].components[0]

    expect(column).toMatchObject({
      component: 'grid-column',
      width: 'two-thirds'
    })
    expect(column.components.map(({ component }) => component)).toEqual([
      'notification-banner',
      'summary-list',
      'url'
    ])
    expect(column.components[0].title).toBe(
      'This agreement offer has been withdrawn'
    )
    expect(JSON.stringify(page.components)).not.toContain(
      '"component":"actions"'
    )
  })
})
