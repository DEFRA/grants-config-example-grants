import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const agreement = JSON.parse(
  readFileSync(new URL('./agreement.json', import.meta.url))
)

describe('Pigs Might Fly offered agreement page', () => {
  it('declares its layout and action button in the component tree', () => {
    const page = agreement.pages.offered

    expect(page.components).toHaveLength(1)
    expect(page.components[0].component).toBe('grid-row')

    const column = page.components[0].components[0]

    expect(column).toMatchObject({
      component: 'grid-column',
      width: 'two-thirds'
    })
    expect(column.components.map(({ component }) => component)).toEqual([
      'heading',
      'paragraph',
      'summary-list',
      'heading',
      'table',
      'summary-list',
      'url',
      'button'
    ])
    expect(column.components.at(-1)).toEqual({
      component: 'button',
      actionId: 'accept'
    })
    expect(JSON.stringify(page.components)).not.toContain(
      '"component":"actions"'
    )
  })
})
