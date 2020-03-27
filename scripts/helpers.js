const sh = require('shelljs');

const check_dependency = (binary) => {
    if (!sh.which(binary)) {
        error(`Maaf, script ini memerlukan ${binary}`);
    }
}

const error = (msg,exit=true) => {
    console.log("ERROR: "+msg);
    if(exit) {
        sh.exit(1);
    } 
}

const get_task = () => {
    const name = process.argv[2];

    if(name === undefined) {
        error('tugas tak tersedia!');
    }

    const task = require('./tasks');

    for(const item in task){
        if(name === item.toString()) {
            return task[item];
        }
    }

    error(`Tugas tidak diketahui ${name}`);
}

const get_target = () => {
    const name = process.argv[3];

    if(name === undefined) {
        error('nama target tidak disediakan!');
    }

    const targets = require('./targets');

    const result = targets.find(obj => {
        return obj.name === name;
    });

    if(result === undefined) {
        error(`Target tidak diketahui ${name}`);
    }
    
    return result;
}

module.exports = {
    check_dependency,
    get_task,
    get_target,
    error
}