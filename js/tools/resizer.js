'use strict';

(function () {

var
ctx      = document.querySelector('#resizer-output').getContext('2d'),
original = document.createElement('canvas').getContext('2d'),
pixels   = document.createElement('canvas').getContext('2d'),

$file         = document.querySelector('#resizer-file'),
$size         = document.querySelector('#resizer-size'),
$current_size = document.querySelector('#resizer-current-size'),
$download     = document.querySelector('#resizer-download'),

filename = '';

pixels.canvas.width  = 4;
pixels.canvas.height = 2;

function getExponent (number) {
	number >>= 6;
	return number ? Math.floor(Math.log(number + 0.5) / LOG_2) : 0;
}

function loadImage (image) {
	ctx.canvas.width  = original.canvas.width  = image.width;
	ctx.canvas.height = original.canvas.height = image.height;
	
	$size.value = getExponent(ctx.canvas.width);
	$current_size.innerText = ctx.canvas.width + ' x ' + ctx.canvas.height;
	
	ctx.drawImage(image, 0,0);
	original.drawImage(image, 0,0);
	
	original.clearRect(0,0, 4,2);
	pixels.clearRect(0,0, 4,2);
	pixels.drawImage(image, 0,0, 4,2, 0,0, 4,2);
	
	ctx.canvas.classList.remove('empty');
	$size.disabled = $download.disabled = false;
}

$file.addEventListener('change', function () {
	if (!this.files[0]) return;
    
    filename = this.files[0].name;
    
	var img = new Image();
	img.onload = function () {
		URL.revokeObjectURL(this.src);
		loadImage(this);
	};
	img.src = URL.createObjectURL(this.files[0]);
});
$size.addEventListener('input', function () {
	ctx.canvas.width = 64 << this.value;
	if (original.canvas.width == original.canvas.height) ctx.canvas.height = ctx.canvas.width;
	else ctx.canvas.height = 32 << this.value;
	
	$current_size.innerText = ctx.canvas.width + ' x ' + ctx.canvas.height;
	
	pixelate(ctx);
	ctx.drawImage(original.canvas, 0,0, ctx.canvas.width, ctx.canvas.height);
	ctx.drawImage(pixels.canvas, 0,0);
});

$download.addEventListener('click', function () {
	save(ctx.canvas, filename, 'x' + ctx.canvas.width);
});


window.resizerLoad = function (canvas, name) {
	loadImage(canvas);
	filename = name;
};

})();