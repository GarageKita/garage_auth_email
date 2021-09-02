const bcrypt = require('bcryptjs')

let hash = (password) => bcrypt.hashSync(password)
let compare = (password, dbPass) => bcrypt.compareSync(password, dbPass)

module.exports = {hash, compare}