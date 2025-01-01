SHELL := /bin/bash

ifeq ($(PLATFORM),Darwin)
	LISTEN_ADDR := "localhost"
else
	LISTEN_ADDR := $(shell if tailscale status --self --json 2>/dev/null | jq -e 'select(.BackendState == "Running")' >/dev/null 2>&1; then tailscale ip -4; else echo "localhost"; fi)
endif

all:
	@echo "Please choose a target manually."

.PHONY: build
build: ENVIRONMENT ?= production
build: BASEURL := $(shell yq '.baseURL' < hugo.yaml)
build:
	hugo build --baseURL $(BASEURL) --environment $(ENVIRONMENT)

.PHONY: build
serve: ENVIRONMENT ?= production
serve: BASEURL := http://$(LISTEN_ADDR):1313/
serve:
	hugo serve --bind $(LISTEN_ADDR) --baseURL $(BASEURL) --environment $(ENVIRONMENT)


update:
	# first perform `npm run build:example`
	fdfind -e '.toml' -x sh -c 'yq -oy -ptoml . < "$${1}" > "$${1%.toml}.yaml"' _ {}
	-shopt -s globstar && rm **/*.toml
	fdfind -e '.yaml' -x yamlfmt
