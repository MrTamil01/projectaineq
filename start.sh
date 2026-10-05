#!/usr/bin/env bash
set -e

if [ ! -f .env ]; then
  if [ -f .env.example ]; then
    cp .env.example .env
  fi
fi

npm install
npm run setup
npm run dev
