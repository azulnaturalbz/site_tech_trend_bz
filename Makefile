.PHONY: dev build lint test start clean docker-build docker-run

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

test:
	npm run test

start:
	npm run start

clean:
	rm -rf dist site_tech_trend_bz.zip

docker-build:
	docker build -t site-tech-trend-bz .

docker-run:
	docker run --rm -p 8080:80 site-tech-trend-bz
