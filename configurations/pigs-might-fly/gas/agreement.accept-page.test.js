import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const agreement = JSON.parse(
  readFileSync(new URL('./agreement.json', import.meta.url))
)

describe('Pigs Might Fly accept agreement page', () => {
  it('places the confirmation and submit button inside the accept form', () => {
    const page = agreement.pages.accept

    expect(page.components).toHaveLength(1)
    expect(page.components[0].component).toBe('grid-row')

    const column = page.components[0].components[0]

    expect(column).toMatchObject({
      component: 'grid-column',
      width: 'two-thirds'
    })
    expect(column.components.map(({ component }) => component)).toEqual([
      'heading',
      'url',
      'paragraph',
      'unordered-list',
      'form'
    ])

    const form = column.components.at(-1)

    expect(form.actionId).toBe('accept')
    expect(form.components.map(({ component }) => component)).toEqual([
      'checkboxes',
      'button'
    ])
    expect(form.components[1]).toEqual({
      component: 'button',
      actionId: 'accept'
    })
    expect(JSON.stringify(page.components)).not.toContain(
      '"component":"actions"'
    )
  })
})
