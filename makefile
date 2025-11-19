# General Docker Commands
up:
	docker compose -f ./etc/docker/docker-compose.yaml up 

build:
	docker compose -f ./etc/docker/docker-compose.yaml build --no-cache


# Build single services
build-database:
	docker compose -f ./etc/docker/docker-compose.yaml build database --no-cache

build-nuxt:
	docker compose -f ./etc/docker/docker-compose.yaml build nuxt --no-cache