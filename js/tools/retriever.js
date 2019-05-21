'use strict';

(function () {

var
ctx = document.createElement('canvas').getContext('2d'),

$form     = document.querySelector('#retriever-form'),
$progress = document.querySelector('#retriever-progress'),
$img      = document.querySelector('#retriever-output'),
$error    = document.querySelector('#retriever-error'),

$convert = document.querySelector('#retriever-convert'),
$resize  = document.querySelector('#retriever-resize'),

busy     = false,
blob     = null,
filename = '';

$img.addEventListener('load', function () {
	busy = $form.submit.disabled = false;
	$progress.classList.remove('show');

	ctx.canvas.width  = this.naturalWidth;
	ctx.canvas.height = this.naturalHeight;

	ctx.drawImage(this, 0,0);

	$convert.removeAttribute('disabled');
	$resize.removeAttribute('disabled');
});
$img.addEventListener('click', function () {
	if (blob) saveAs(blob, filename);
});

function processResult (e) {
	if (this.status == 200) {
		blob = this.response;
		filename = this.getResponseHeader('X-Nickname') + '.png';
		URL.revokeObjectURL($img.src);
		$img.src = URL.createObjectURL(blob);
		$error.innerText = '';
	} else {
		var F = new FileReader();
		F.onload = function () {
			$error.innerText = JSON.parse(this.result).error;
			busy = $form.submit.disabled = false;
			$progress.classList.remove('show');
		};
		F.readAsText(this.response);
	}
}

$form.addEventListener('submit', function (e) {
	e.preventDefault();

	if (busy) return;

	if (this.nickname.value == '') {
		$error.innerText = 'Enter a nickname';
		return;
	}

	busy = this.submit.disabled = true;
	$progress.style.width = 0;
	$progress.classList.add('show');

	this.nickname.blur();

	var xhr = new XMLHttpRequest();

	xhr.open('GET', SKINS_URL + this.nickname.value.trim());
	xhr.responseType = 'blob';

	xhr.onprogress = function (e) {
		$progress.style.width = e.loaded / e.total * 100 + '%';
	};
	xhr.onload = xhr.onerror = processResult;
	xhr.send();
});

$convert.addEventListener('click', function () {
	converterLoad(ctx.canvas, filename);
});
$resize.addEventListener('click', function () {
	resizerLoad(ctx.canvas, filename);
});

})();
