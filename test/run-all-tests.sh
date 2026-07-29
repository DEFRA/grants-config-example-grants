#!/bin/bash
set -e

# Usage:
#   Run all acceptance tests:
#     ./test/run-all-tests.sh

TEST_COMMAND='npm run test:ci'

export COMPOSE_EXPERIMENTAL_GIT_REMOTE=true

OVERRIDE_FILE="$(cd "$(dirname "$0")" && pwd)/compose.acceptance.localconfig.yml"

export ACCEPTANCE_TESTS_HOOK="
  docker compose -f https://github.com/DEFRA/grants-ui.git#main:compose.tests.yml -f ${OVERRIDE_FILE} run --interactive=false -T --quiet-pull --rm grants-ui-acceptance-tests $TEST_COMMAND &&
  docker compose -f https://github.com/DEFRA/grants-ui.git#main:compose.tests.yml -f ${OVERRIDE_FILE} down
"

if [ "${CI}" = "true" ]; then
  export ACCEPTANCE_TESTS_HOOK="yes | ${ACCEPTANCE_TESTS_HOOK}"
fi

# Grants set up for acceptance tests (keep in sync with release.yml).
GRANTS=(
  example-grant-with-auth
  example-grant-with-map
  example-grant-with-task-list
  example-grant-with-task-list-hide-questions
  example-whitelist
  pigs-might-fly
)

ALLOWLIST_BASE_URL='https://raw.githubusercontent.com/DEFRA/grants-ui/main/localstack/config-broker/local-allowlists'

mkdir -p test/testconfig
for grant in "${GRANTS[@]}"; do
  cp -r "configurations/${grant}/" "test/testconfig/${grant}@0.0.0"
done
cp $(dirname "$0")/release.yml test/testconfig/

# Fetch the canonical allowlist for every grant. Passing all URL/output pairs to
# a single curl invocation reuses the connection (HTTP/2 multiplexing), which is
# faster than spawning one curl per file.
CURL_ARGS=()
for grant in "${GRANTS[@]}"; do
  CURL_ARGS+=(-o "test/testconfig/${grant}@0.0.0/grants-ui/allowlist.yaml" "${ALLOWLIST_BASE_URL}/${grant}.yaml")
done
curl -fsSL "${CURL_ARGS[@]}"

mkdir -p test/testconfig/schemas
cp configurations/example-grant-with-auth/grants-ui/example-grant-with-auth-submission.schema.json test/testconfig/schemas/

"$(dirname "$0")/docker-compose-smoke-test.sh"
