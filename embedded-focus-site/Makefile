SHELL := /bin/bash

ifeq ($(PLATFORM),Darwin)
	LISTEN_ADDR := "localhost"
else
	LISTEN_ADDR := $(shell if tailscale status --self --json 2>/dev/null | jq -e 'select(.BackendState == "Running")' >/dev/null 2>&1; then tailscale ip -4; else echo "localhost"; fi)
endif

ENVIRONMENT ?= production
BASEURL ?= $(shell yq '.baseURL' < hugo.yaml)

all:
	@echo "Please choose a target manually."

.PHONY: build
build:
	hugo build --baseURL $(BASEURL) --environment $(ENVIRONMENT)

.PHONY: build
serve: BASEURL := http://$(LISTEN_ADDR):1313/
serve:
	hugo serve --bind $(LISTEN_ADDR) --baseURL $(BASEURL) --environment $(ENVIRONMENT)

.PHONY: deploy-preview
deploy-preview:
	$(MAKE) build BASEURL=https://embedded-focus.com/preview/
	rsync -avz -e ssh --rsync-path="/tmp/rsync" public/ netcup:/embedded-focus.com/httpdocs/preview/


update:
	# first perform `npm run build:example`
	fdfind -e '.toml' -x sh -c 'yq -oy -ptoml . < "$${1}" > "$${1%.toml}.yaml"' _ {}
	-shopt -s globstar && rm **/*.toml
	fdfind -e '.yaml' -x yamlfmt
