# grants-config-example-grants

## 0.7.0

### Minor Changes

- f355bf8: feat(GRAN-8): import configuration from old config repo

## 0.6.0

## Below is copied in from the old config repo, see: https://github.com/DEFRA/grant-config-example-grants

## 0.6.0

### Minor Changes

- 95efabd: Add landing page example

## 0.5.0

### Minor Changes

- ab59005: Move view permission to config

## 0.4.0

### Minor Changes

- 5c0eb11: Add configurable page-level permissions for grant applications, including amend, submit and view-only access rules

## 0.3.8

### Patch Changes

- 383a3fb: Add permissions.enforce = false

## 0.3.7

### Patch Changes

- 87435f4: Make `projectDescription` required in example-grant-with-auth to match the GAS schema. Leaving it blank previously caused a 400 on submission (`projectDescription must be string`). Adds an `Enter a project description` validation message and drops the misleading "Optional." hint.

## 0.3.7

### Patch Changes

- TGC-1372: Make `projectDescription` required in example-grant-with-auth to match the GAS schema. Leaving it blank previously caused a 400 on submission (`projectDescription must be string`). Adds an `Enter a project description` validation message and drops the misleading "Optional." hint.

## 0.3.6

### Patch Changes

- 68e6c95: Allow null for hiddenField in example-grant-with-auth submission schema (form declares `required: false` with no default), and sync gas.json with the PR #862 field set so the GAS-side schema matches the deployed form.

## 0.3.5

### Patch Changes

- 82c6f98: Update example-grant-with-auth submission schema

## 0.3.4

### Patch Changes

- ec77476: Update example-grant-with-auth yaml for TGC-1097

## 0.3.3

### Patch Changes

- e2bca39: Fixing some auto format issues with yaml file

## 0.3.2

### Patch Changes

- a5db410: Tolerate CPH errors when fetching business details

## 0.3.1

### Patch Changes

- 4c2e952: Minor change to example-grant-with-auth. plus run acceptance tests when config changes

## 0.3.0

### Minor Changes

- d60682d: Add details page to example-grant-with-auth

## 0.2.2

### Patch Changes

- dab1d19: Add an estimated PMF submission schema

## 0.2.1

### Patch Changes

- b897b88: Add hotfix release mechanism and instructions

## 0.2.0

### Minor Changes

- 2e6d37c: Add validation config for example-grant-with-auth

## 0.1.0

### Minor Changes

- 20a18e8: Add some gas config and rename pigs-might-fly

## 0.0.9

### Patch Changes

- d2bb049: Enable protected workflow on repo

## 0.0.8

### Patch Changes

- 164ee43: Update example configs. Remove dummy file added for demo

## 0.0.7

### Patch Changes

- d81b727: Add new config for demo

## 0.0.6

### Patch Changes

- 28a0015: Remove the example added for demo

## 0.0.5

### Patch Changes

- 0333f99: Just an eample

## 0.0.4

### Patch Changes

- 5bd1734: Update release name to make it a bit simpler

## 0.0.3

### Patch Changes

- db7a762: Add missing script that allows version publish to happen

## 0.0.2

### Patch Changes

- 8b6d4f3: Adding helper setup
