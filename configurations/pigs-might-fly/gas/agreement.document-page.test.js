import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const agreement = JSON.parse(
  readFileSync(new URL('./agreement.json', import.meta.url))
)

describe('Pigs Might Fly agreement document page', () => {
  it('declares full-width component trees for the printable document and sections', () => {
    const page = agreement.pages.document

    expect(page).toMatchObject({
      layout: 'document',
      contents: true,
      print: true
    })
    expect(page.components).toHaveLength(1)
    expect(page.components[0].component).toBe('grid-row')

    const documentColumn = page.components[0].components[0]

    expect(documentColumn.component).toBe('grid-column')
    expect(documentColumn.width).toBe('full')
    expect(documentColumn.components.map(({ component }) => component)).toEqual(
      [
        'notification-banner',
        'notification-banner',
        'notification-banner',
        'notification-banner',
        'heading',
        'summary-list'
      ]
    )

    expect(page.sections.map(({ id }) => id)).toEqual([
      'agreement-overview',
      'pigs-and-funding',
      'payment-schedule',
      'acceptance',
      'about-this-test-agreement'
    ])
    expect(
      page.sections.every(
        ({ components }) =>
          components.length === 1 &&
          components[0].component === 'grid-row' &&
          components[0].components.length === 1 &&
          components[0].components[0].component === 'grid-column' &&
          components[0].components[0].width === 'full'
      )
    ).toBe(true)
    expect(
      page.sections.map(({ components }) =>
        components[0].components[0].components.map(({ component }) => component)
      )
    ).toEqual([
      ['paragraph'],
      ['table', 'summary-list'],
      ['summary-list', 'table'],
      ['summary-list', 'paragraph'],
      ['paragraph']
    ])
  })
})
