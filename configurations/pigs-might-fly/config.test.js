import { readFile } from 'node:fs/promises'

const readJson = async (path) =>
  JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'))

const getTasks = (config) =>
  config.phases.flatMap((phase) =>
    phase.stages.flatMap((stage) =>
      stage.taskGroups.flatMap((taskGroup) => taskGroup.tasks)
    )
  )

const getExternalStatuses = (config) =>
  config.externalStatusMap.phases.flatMap((phase) =>
    phase.stages.flatMap((stage) => stage.statuses)
  )

describe('pigs-might-fly agreement configuration', () => {
  test('uses the current caseworking task and agreement-link contract', async () => {
    const config = await readJson('./cw/cw.json')
    const agreementUrl = config.definitions.agreementsService.internalUrl
    const agreementLink = config.pages.cases.details.tabs.agreements.content
      .find(({ component }) => component === 'summary-list')
      .rows.find(({ label }) => label === 'View').text[0].href

    expect(agreementUrl).toBe(
      'https://fg-cw-frontend.%ENVIRONMENT%.cdp-int.defra.cloud/cases/{caseId}/agreement/{agreementRef}'
    )
    expect(agreementLink.params.caseId).toBe('$._id')

    for (const task of getTasks(config)) {
      expect(task).toHaveProperty('valueOptions')
      expect(task).not.toHaveProperty('statusOptions')
    }
  })

  test('maps approved caseworking positions to agreement generation once', async () => {
    const config = await readJson('./gas/gas.json')
    const statuses = getExternalStatuses(config)
    const statusKeys = statuses.map(({ code, source }) => `${source}:${code}`)

    expect(new Set(statusKeys).size).toBe(statusKeys.length)

    for (const code of [
      'PRE_AWARD:FINAL_REVIEW:APPLICATION_APPROVED',
      'PRE_AWARD:FINAL_APPROVAL:APPLICATION_APPROVED'
    ]) {
      expect(statuses).toContainEqual({
        code,
        source: 'CW',
        mappedTo: 'PRE_AWARD:REVIEW_APPLICATION:AGREEMENT_GENERATING'
      })
    }
  })

  test('uses agreement generation instead of the obsolete approved state', async () => {
    const config = await readJson('./gas/gas.json')
    const reviewApplication = config.phases
      .find(({ code }) => code === 'PRE_AWARD')
      .stages.find(({ code }) => code === 'REVIEW_APPLICATION')
    const statusCodes = reviewApplication.statuses.map(({ code }) => code)

    expect(statusCodes).toContain('AGREEMENT_GENERATING')
    expect(statusCodes).not.toContain('APPLICATION_APPROVED')
  })
})
