# Local development (macOS / OrbStack)
# ------------------------------------
up:
	docker compose -f ./etc/docker/docker-compose.yaml up

build:
	docker compose -f ./etc/docker/docker-compose.yaml build --no-cache

# Build single services
build-database:
	docker compose -f ./etc/docker/docker-compose.yaml build database --no-cache

build-nuxt:
	docker compose -f ./etc/docker/docker-compose.yaml build nuxt --no-cache


# Production (ZimaOS NAS)
# -----------------------
# DOCKER_CONFIG=/tmp is required on ZimaOS. These targets are meant to be run
# on the NAS from /DATA/AppData/numberish-hub, not from the Mac.
PROD_COMPOSE = DOCKER_CONFIG=/tmp docker compose \
	-f ./etc/docker/production/docker-compose.yaml \
	--env-file ./etc/docker/production/.env

prod-up:
	$(PROD_COMPOSE) up -d --build

prod-down:
	$(PROD_COMPOSE) down

prod-logs:
	$(PROD_COMPOSE) logs -f --tail=100

prod-ps:
	$(PROD_COMPOSE) ps

prod-restart:
	$(PROD_COMPOSE) restart

# Pull latest from GitHub and rebuild in place.
prod-deploy:
	git pull --ff-only
	$(PROD_COMPOSE) up -d --build
	$(PROD_COMPOSE) ps

.PHONY: up build build-database build-nuxt prod-up prod-down prod-logs prod-ps prod-restart prod-deploy
