package main

import (
	"flag"
	"log"
)

func main() {
	f := flag.String("gen", "", "generate data")
	n := flag.Int("n", 0, "number of fake data")
	flag.Parse()

	if f == nil || n == nil {
		log.Fatalln("Give a flag")
	}

	if *f == "users" {
		gen_users(*n, "tmp/fake_data.json")
	}

	if *f == "services" {
		gen_services(*n, "tmp/fake_services_data.json")
	}
}
