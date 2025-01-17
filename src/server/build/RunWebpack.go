package build

import (
	"fmt"
	"os/exec"
)

func RunWebpack() {
	fmt.Println("Building webpack...")
	_ = exec.Command("npm")
}
