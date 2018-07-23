var
LOG_2     = Math.log(2),
SKINS_URL = 'https://ponyskins.herokuapp.com/';

function clear (ctx, s, x,y, w,h) {
	ctx.clearRect(x * s, y * s, w * s, h * s);
}
function translate (ctx, s, x,y) {
	ctx.translate(x * s, y * s);
}
function pixelate (ctx) {
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
}
function drawImage(ctx, img, s, sx,sy, sw,sh, dx,dy, dw,dh) {
	ctx.drawImage(img, sx * s, sy * s, sw * s, sh * s, dx * s, dy * s, dw * s, dh * s);
}

function save (canvas, filename, suffix) {
	canvas.toBlob(function (blob) {
		saveAs(blob, filename.replace(/\.png$/, '_' + suffix + '.png'));
	});
}