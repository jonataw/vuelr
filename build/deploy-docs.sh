#!/usr/bin/env sh

set -e

cd docs

npm run vuepress:build

cd .vuepress/dist

git init
git add -A
git commit -m 'Deploy'

git push -f https://github.com/jonataw/vuelr master:gh-pages

cd -
