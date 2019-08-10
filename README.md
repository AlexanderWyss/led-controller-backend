# led-controller-backend
## Setup on Raspberry:
Install node v10.15.0

Fit Prerequisites of [bleno](https://github.com/noble/bleno)

Clone repo into a Directory next to the [Frontend](https://github.com/AlexanderWyss/LED-Controller)

`npm i`

Run `ionic build` in LED-Controller

Start led-controller-backend `sudo npm start`

For production use `sudo node led-controller-backend/bin/www`

When stared from crontab is an inital `sleep 5`required and it must be the roots crontab

Default Port: 3000

Port can be set via the env variable `Port`
