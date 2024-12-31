SHELL := /bin/bash

convert:
	fdfind -e '.toml' -x sh -c 'yq -oy -ptoml . < "$${1}" > "$${1%.toml}.yaml"' _ {}
	-shopt -s globstar && rm **/*.toml
	fdfind -e '.yaml' -x yamlfmt
