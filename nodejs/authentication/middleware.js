const ROLES_FILE = __dirname + '/roles.txt';
const fs = require('fs');


module.exports = (scope) => (req, res, next) => {
    let task=scope.split(".")
    console.log('::::::scope::::')
    console.log(scope)
    console.log('::::::header::::')
    console.log(JSON.stringify(req.headers['x-role']))

    console.log('::::::task::::')
    console.log(task)

    
    console.log('::::::roles::::')


    if(req.headers['x-role']==='admin' && task[1]==='create'){
        console.log('::::::::: role is Admin and create scope:::::::::')
        next()
    }else if(req.headers['x-role']!=='admin' && task[1]==='create'){
        console.log('::::::::: role is not admin and create scope:::::::::')
        res.sendStatus(403)
    }else if((req.headers['x-role']==='admin' || req.headers['x-role']==='customer') && task[1]==='getById'){
        console.log('::::::::: role is admin or customer and getbyid scope:::::::::')
        next()
    }else if((req.headers['x-role']==='admin' || req.headers['x-role']==='customer') && task[1]==='')
    {
        console.log('::::::::: role is admin or customer and no scope is given:::::::::')
        next()
    }else if (scope==='')
    {
        console.log('::::::::: scope is not given -- it is NA::::::::')
        next()
    }else{
        res.sendStatus(403)
    }
};
