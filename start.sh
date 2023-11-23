#!/bin/bash

# Kill pre-existing processes
NODEPID=$(lsof -t -i :5173 -s TCP:LISTEN)
kill -9 "$NODEPID"

FLASKPID=$(lsof -t -i :8080 -s TCP:LISTEN)
kill -9 "$FLASKPID"

DBPID=$(lsof -t -i :8090 -s TCP:LISTEN)
kill -9 "$DBPID"


# Start processes

./db/pocketbase serve & source backend/venv/bin/activate & python ./backend/app.py & pnpm --prefix ./frontend run dev
