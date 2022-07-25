var to = 1000, timeout, counter = 0, lastKey, keyPressTimeout, keyPressTO = 1000;

//Input using mouse from screen keypad
$("#nokia button").bind("mousedown", function () {
    var $this = $(this),
        $result = $('#result'),
        val = $result.val(),
        button_pressed = $this.attr("data-value");

    keyPressTimeout = setTimeout(function () {
        // if pressed more than 1 sec, add Value
        val += button_pressed;
        $result.val(val);
        keyPressTimeout = null;
    }, keyPressTO);

}).bind("mouseup", function (event) {
    clearTimeout(keyPressTimeout);

    if (!keyPressTimeout) {
        return false;
    }
    var $this = $(this),
        $result = $('#result'),
        val = $result.val(),
        button_pressed = $this.attr("data-value");

    // if the user clicks on a new key reset all
    if (lastKey !== button_pressed) {
        reset();
    }

    // if the user click fast on the same key, remove the last charchter to replace it with the new
    if (counter !== 0 && lastKey === button_pressed) {
        val = val.substring(0, val.length - 1);
    }

    val += t9(button_pressed);
    $result.val(val);

    // restart the timeout
    clearTimeout(timeout);
    counter++;

    // save the last key pressed so we can compare it in the next click
    lastKey = button_pressed;

    // if the user not clicked on anything within the timeout delay, reset all.
    timeout = setTimeout(reset, to);
});

//Send the alphabet representation according to button pressed
function t9(button_pressed) {
    return keys[button_pressed][counter % keys[button_pressed].length];
}

// Reset the temp_data
function reset() {
    counter = 0;
    lastKey = null;
}


//Input using Keyboard
$("body").bind("keyup", function (event) {
    var $this = $(this),
        $result = $('#result'),
        val = $result.val(),
        key_pressed = event.which - 48;

    // if the user presses new key, reset all
    if (lastKey !== key_pressed) {
        reset();
    }

    // if the user click fast on the same key, remove the last charchter to replace it with the new
    if (counter !== 0 && lastKey === key_pressed) {
        val = val.substring(0, val.length - 1);
    }

    if (key_pressed !== -40){
        val += t9(key_pressed);
    } else {
        val = val.substring(0, val.length - 1);
    }
    $result.val(val);

    // restart the timeout
    clearTimeout(timeout);
    counter++;

    // save the last key pressed so we can compare it in the next click
    lastKey = key_pressed;

    // if the user not clicked on anything within the timeout delay, reset all.
    timeout = setTimeout(reset, to);
});

//Dictionary for the keys
var keys = {
    '1': ['.', ',', '!', '1'],
    '2': ['a', 'b', 'c', '2'],
    '3': ['d', 'e', 'f', '3'],
    '4': ['g', 'h', 'i', '4'],
    '5': ['j', 'k', 'l', '5'],
    '6': ['m', 'n', 'o', '6'],
    '7': ['p', 'q', 'r', 's', '7'],
    '8': ['t', 'u', 'v', '8'],
    '9': ['w', 'x', 'y', 'z', '9'],
    '*': ['*'],
    '#': ['#'],
    '0': [' ', '0', '*', '#']
};