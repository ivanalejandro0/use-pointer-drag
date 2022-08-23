#!/usr/bin/env sh

tmp=$(mktemp --suffix=".tgz")
yarn pack --filename $tmp
tar --list --gzip --file $tmp
rm -f $tmp
