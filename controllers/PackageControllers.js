const Package=require('../models/packageModel')
const factory = require("./handlerFactory");


exports.deleteAllTour = factory.deletALL(Package);
exports.getAllTour = factory.getAll(Package);
exports.getTour = factory.getOne(Package);
exports.deleteTour = factory.deletOne(Package);
exports.updateTour = factory.UdateOne(Package);
exports.createOne = factory.createOne(Package);