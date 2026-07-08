# grants-config-example-grants

Example grant configurations used to exercise Grants UI features, integration paths, and release tooling.

## Language

**Grant configuration**
A versioned set of files under `configurations/` that describes a grant journey and any integration payloads.
_Avoid_: Form code, Runtime state, Test script

**Configuration directory**
One grant-specific directory under `configurations/`.
_Avoid_: Package, Module, App

**Example grant**
A representative grant used to demonstrate or test Grants UI capabilities.
_Avoid_: Production grant, Fixture when the whole grant journey is meant

**Grant journey**
The configured end-to-end user flow rendered by Grants UI.
_Avoid_: Wizard, Survey, Funnel

**Task list**
A configured progress page that groups a journey into sections and tasks.
_Avoid_: Dashboard, Checklist, Menu

**Whitelist**
A grant-specific access list used to control whether a user can enter a journey.
_Avoid_: Role, Permission, Feature flag

**GAS config**
Configuration used by the Grants Application Service integration.
_Avoid_: Grants UI config, Casework config, Backend state

**Grants UI config**
Configuration consumed by Grants UI to render pages, routes, components, and validation.
_Avoid_: GAS config, Source code, Test data

**Changeset**
The release note/version marker required for configuration changes.
_Avoid_: Changelog entry when the `.changeset` file is meant, Commit message

**Hotfix release**
A patch release from a tagged version used only when the normal release path cannot deliver the fix.
_Avoid_: Regular release, Feature branch, Rollback
