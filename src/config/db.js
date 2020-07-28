const {Pool} = require('pg')

module.exports = new Pool ({
    user: 'postgres',
    password:'q1w2e3',
    host:'localhost',
    port: 5432,
    database:"my_teacher"
})