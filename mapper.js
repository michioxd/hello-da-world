var sound, blob;

$('#file').on('change', function(evt) {
    if (evt.target.files.length > 0) {
        var filename = $(this).val().split('\\').pop();
        var mimetype = $(this).val().split('\\').pop().split('.').pop();
        var file = evt.target.files[0];
        blob = URL.createObjectURL(file);
        sound = new Howl({
            src: blob,
            preload: true,
            html5: true,
        });
        $('body').addClass('fileLoadded');
    }
});

$('#speedChange').on('change', function() {
    var value = $(this).val();
    sound.rate(value);
    $('#currentSpeed').html(value + 'x');
});

function defaultSpeed() {
    sound.rate(1);
    $('#speedChange').val(1);
}


function gotoTime() {
    var time = parseInt(document.getElementById('goToTime').value);
    sound.seek(time);
}

setInterval(function() {
    if (sound !== undefined) {
        if (sound.playing()) {
            document.getElementById('goToTime').value = sound.seek();
            document.getElementById('ct').innerHTML = sound.seek() + ' / ' + sound.duration();
        }
    }
});
$(document).keydown(function(e) {
    if ($('.des').css('display') !== 'none') {
        if (e.keyCode == 68) {
            document.getElementById('time0').value += `{"offset": ${sound.seek()}},`;
        }
        if (e.keyCode == 70) {
            document.getElementById('time1').value += `{"offset": ${sound.seek()}},`;
        }
        if (e.keyCode == 74) {
            document.getElementById('time2').value += `{"offset": ${sound.seek()}},`;
        }
        if (e.keyCode == 75) {
            document.getElementById('time3').value += `{"offset": ${sound.seek()}},`;
        }
    }
    if (e.keyCode == 32) {
        play()
    }
});

function openMeta() {
    if ($('.des').css('display') !== 'none') {
        $('.des').hide();
        $('.trackinfo').show();
    } else {
        $('.des').show();
        $('.trackinfo').hide();
    }
}

function CopyMe(TextToCopy) {
    var TempText = document.createElement("input");
    TempText.value = TextToCopy;
    document.body.appendChild(TempText);
    TempText.select();
    document.execCommand("copy");
    document.body.removeChild(TempText);
}

function copy() {
    CopyMe(document.getElementById('time').value);
}

function copyTime() {
    CopyMe(sound.seek());
}

function play() {
    if (sound.playing()) {
        sound.pause();
    } else {
        sound.play();
    }
}

function stop() {
    sound.stop();
    document.getElementById('ct').innerHTML = '0 / 0';
}

function unload() {
    sound.stop();
    document.getElementById('ct').innerHTML = '0 / 0';
    $('body').removeClass('fileLoadded');
    URL.revokeObjectURL(blob);
    $('#file').val('');
}