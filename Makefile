test: node_modules
	@node_modules/.bin/mocha \
		--reporter spec \

node_modules: package.json
	@npm install -qs

.PHONY: test