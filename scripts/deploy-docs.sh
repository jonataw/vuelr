#!/usr/bin/env sh
# Publishes docs to gh-pages.

set -e

npm run docs:build

cd docs/.vitepress/dist

git init
git add -A
git commit -m 'Deploy'

git push -f https://github.com/jonataw/vuelr master:gh-pages

cd -
