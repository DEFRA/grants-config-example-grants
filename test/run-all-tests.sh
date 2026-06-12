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

mkdir -p test/testconfig
cp -r example-grant-with-auth/ test/testconfig/example-grant-with-auth@0.0.0
cp $(dirname "$0")/release.yml test/testconfig/

mkdir -p test/testconfig/schemas
cp example-grant-with-auth/grants-ui/example-grant-with-auth-submission.schema.json test/testconfig/schemas/

"$(dirname "$0")/docker-compose-smoke-test.sh"
