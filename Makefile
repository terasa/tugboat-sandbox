install:
	npm install
	npm run build

pre-install:
	curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
	sudo apt-get install -y nodejs

tugboat-init: pre-install install
tugboat-update: install
tugboat-build: install
