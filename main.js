const canvas = document.getElementById('root');
const ctx = canvas.getContext('2d');
let count = 0;

const SNOWFALL_RATE = 4;

function Snowflake(x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.purge = false;
	this.vel = {
		x: Math.random() * 0.4 - 0.2,
		y: 1 + Math.random() * 2,
	}
	this.dir = parseInt(Math.random() * 2);
}

Snowflake.prototype.update = function() {
	// Check if the snowflake has left the chat
	if (this.y >= canvas.height) {
		this.purge = true;
	} else {
		this.y += this.vel.y;
		this.x += this.vel.x;
	}
}

Snowflake.prototype.draw = function() {
	ctx.fillStyle = 'white';
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
	ctx.fill();
}

function draw() {
	// Clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw background
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Draw all the snowflakes
	for (let i = 0; i < snowflakes.length; i++) {
		snowflakes[i].draw();
	}
}

function update() {
	// Purge all marked snowflakes
	snowflakes = snowflakes.filter(flake => !flake.purge);

	// Add new snowflakes
	if (count % SNOWFALL_RATE === 0) {
		const r = 1;
		const x = parseInt(Math.random() * (canvas.width - r*2));
		const y = -(r*2);
		const snowflake = new Snowflake(x, y, r);
		snowflakes.push(snowflake);
	}

	// Update the snowflakes' positions
	for (let i = 0; i < snowflakes.length; i++) {
		snowflakes[i].update();
	}
}

function loop() {
	draw();
	update();

	count++;

	requestAnimationFrame(loop);
}

let snowflakes = [];

loop();
