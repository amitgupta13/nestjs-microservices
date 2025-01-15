docker build ../../ -f Dockerfile -t sleepr-reservations

protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/{{protofileName}}.proto

Command 'protoc' not found, but can be installed with:
sudo snap install protobuf # version 3.14.0, or
sudo apt install protobuf-compiler # version 3.21.12-8ubuntu1
See 'snap info protobuf' for additional versions.
