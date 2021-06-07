// +build mage

package main

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"

	"github.com/magefile/mage/sh"
)

var (
	env = map[string]string{
		"CGO_ENABLED": "0",
	}
)

func BuildFrontend() error {
	cd, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("error getting current directory: %s", err)
	}

	p := filepath.Join(cd, "frontend")

	err = os.Chdir(p)
	if err != nil {
		return fmt.Errorf("error changing directories: %s", err)
	}

	err = sh.Run("docker", "build", "-t", "elastic-frontend", p)
	if err != nil {
		return fmt.Errorf("error with build: %s", err)
	}

	return nil
}

func CreateProto() error {
	cd, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("error getting current directory: %s", err)
	}

	p := filepath.Join(cd, "proto")

	err = os.Chdir(p)
	if err != nil {
		return fmt.Errorf("error changing directories: %s", err)
	}

	err = sh.Run("protoc", "--go_out=plugins=grpc:.", "*.proto")
	if err != nil {
		return fmt.Errorf("error with build: %s", err)
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

	p := filepath.Join(cd, "client")

	err = os.Chdir(p)
	if err != nil {
		return fmt.Errorf("error changing directories: %s", err)
	}

	err = sh.RunWith(env, "go", "build")
	if err != nil {
		return fmt.Errorf("error with build: %s", err)
	}

	err = sh.Run("docker", "build", "-t", "proto-client", p)
	if err != nil {
		return fmt.Errorf("error with build: %s", err)
	}

	err = os.Chdir(cd)
	if err != nil {
		return fmt.Errorf("could not change directories: %s", err)
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

	err = sh.Run("docker", "build", "-t", "proto-server", p)
	if err != nil {
		return fmt.Errorf("error with build: %s", err)
	}

	err = os.Chdir(cd)
	if err != nil {
		return fmt.Errorf("could not change directories: %s", err)
	}

	return nil
}

func Run() error {
	err := BuildClient()
	if err != nil {
		return fmt.Errorf("could not build client: %s", err)
	}
	BuildServer()
	if err != nil {
		return fmt.Errorf("could not build server: %s", err)
	}

	o := runtime.GOOS
	switch o {
	case "windows":
		err = sh.Run("docker", "compose", "up", "-d")
		if err != nil {
			return fmt.Errorf("could not run docker compose: %s", err)
		}
	case "darwin":
		err = sh.Run("docker", "compose", "up", "-d")
		if err != nil {
			return fmt.Errorf("could not run docker compose: %s", err)
		}
	case "linux":
		err = sh.Run("docker-compose", "up", "-d")
		if err != nil {
			return fmt.Errorf("could not run docker compose: %s", err)
		}
	}

	return nil
}

func Stop() error {
	var err error
	o := runtime.GOOS
	switch o {
	case "windows":
		err = sh.Run("docker", "compose", "down")
		if err != nil {
			return fmt.Errorf("could not run docker compose: %s", err)
		}
	case "darwin":
		err = sh.Run("docker", "compose", "down")
		if err != nil {
			return fmt.Errorf("could not run docker compose: %s", err)
		}
	case "linux":
		err = sh.Run("docker-compose", "down")
		if err != nil {
			return fmt.Errorf("could not run docker compose: %s", err)
		}
	}

	return nil
}
