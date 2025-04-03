#!/bin/bash

cd "$WHEN_F1_DIR/backend" || exit 1
gunicorn -w 4 -b 127.0.0.1:5000 app:app &

cd "$WHEN_F1_DIR/frontend" || exit 1
serve -s build -l 3000 &

wait