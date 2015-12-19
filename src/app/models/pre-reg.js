/**
 * Created by nicholas on 18/12/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var preRegSchema = Schema({
    email : String
});

module.exports = mongoose.model('PreReg', preRegSchema);