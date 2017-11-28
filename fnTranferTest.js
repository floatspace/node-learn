function say(name) {
    console.log(name);
}

function execute(fn, value) {
    fn(value);
}

execute(say, 'hello');
