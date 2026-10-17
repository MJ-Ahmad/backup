#!/bin/bash

case "$1" in

task)

shift

python3 add_task.py "$@"

;;

track)

shift

python3 track_task.py "$@"

;;

complete)

shift

python3 complete_task.py "$@"

;;

validate)

python3 validate.py

;;

web)

cd web

python3 -m http.server 8000

;;

*)

echo ""
echo "Usage:"
echo ""

echo "./run.sh task ..."
echo "./run.sh track ..."
echo "./run.sh complete ..."
echo "./run.sh validate"
echo "./run.sh web"

;;

esac
