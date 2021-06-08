// +build mage

package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"github.com/magefile/mage/sh"
)

var (
	env = map[string]string{
		"CGO_ENABLED": "0",
	}
)

func CreateProto() error {

	fpPath := filepath.Join("frontend", "src", "app", "proto")
	if _, err := os.Stat(fpPath); os.IsNotExist(err) {
		err := os.Mkdir(fpPath, 0775)
		if err != nil {
			return fmt.Errorf("could not create frontend proto path: %s", err)
		}
	}

	cd, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("error getting current directory: %s", err)
	}

	p := filepath.Join(cd, "proto")

	err = os.Chdir(p)
	if err != nil {
		return fmt.Errorf("error changing directories: %s", err)
	}

	files, err := ioutil.ReadDir("./")
	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		extension := filepath.Ext(file.Name())
		if extension == ".proto" {
			err = sh.Run("protoc", "--go_out=plugins=grpc:.", file.Name())
			if err != nil {
				return fmt.Errorf("error building go proto for %s: %s", file.Name(), err)
			}

			err = sh.Run("protoc", "--js_out=import_style=commonjs:./../frontend/src/app/proto", "--grpc-web_out=import_style=typescript,mode=grpcwebtext:./../frontend/src/app/proto", file.Name())
			if err != nil {
				return fmt.Errorf("error building go proto for %s: %s", file.Name(), err)
			}
		}
	}

	err = os.Chdir(cd)
	if err != nil {
		return fmt.Errorf("could not change directories: %s", err)
	}

	return nil
}

func BuildClient() error {
	cd, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("error getting current directory: %s", err)
	}

	p := filepath.Join(cd, "frontend")

	err = os.Chdir(p)
	if err != nil {
		return fmt.Errorf("error changing directories: %s", err)
	}

	err = sh.Run("docker", "build", "-t", "elastic-client", p)
	if err != nil {
		return fmt.Errorf("error with build: %s", err)
	}

	return nil
}

func BuildEnvoy() error {
	cd, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("error getting current directory: %s", err)
	}

	p := filepath.Join(cd, "envoy")

	err = os.Chdir(p)
	if err != nil {
		return fmt.Errorf("error changing directories: %s", err)
	}

	err = sh.Run("docker", "build", "-t", "elastic-envoy", p)
	if err != nil {
		return fmt.Errorf("error with build: %s", err)
	}

	return nil
}

func BuildServer() error {
	cd, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("error getting current directory: %s", err)
	}

	p := filepath.Join(cd, "server")

	err = os.Chdir(p)
	if err != nil {
		return fmt.Errorf("error changing directories: %s", err)
	}

	err = sh.RunWith(env, "go", "build")
	if err != nil {
		return fmt.Errorf("error with build: %s", err)
	}

	err = sh.Run("docker", "build", "-t", "elastic-server", p)
	if err != nil {
		return fmt.Errorf("error with build: %s", err)
	}

	err = os.Chdir(cd)
	if err != nil {
		return fmt.Errorf("could not change directories: %s", err)
	}

	return nil
}
