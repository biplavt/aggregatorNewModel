var express=require('express');
var router=express.Router();
var path = require('path');


var routes = require('./index');
var aasfRoute = require('../controller/aasf.controller');
var aircraftRoute = require('../controller/aircraft.controller');
var aircraftavailable = require('../controller/aircraftavailable.controller');
var crews = require('../controller/crews.controller');
var aftps = require('../controller/aftps.controller');
var missions = require('../controller/missions.controller');
var aircraftdetail = require('../controller/aircraftdetail.controller');
var AASFAFTPTotals = require('../controller/AASFAFTPTotals.controller');
var crypt = require('../controller/crypt.controller');
var nuke = require('../controller/nuke.controller');


router.route('/').get(routes.getIndex);

router.route('/aasf').get(aasfRoute.getAASF);	//works
router.route('/aasf').post(aasfRoute.postAASF);	//w
		
router.route('/aircraft').post(aircraftRoute.postAircraft);	//w

router.route('/aircraftavailable').post(aircraftavailable.postAircraftData);//w

router.route('/crews').post(crews.postCrewData);//w

router.route('/aftps').post(aftps.postAFTPData);//w
router.route('/aftps').get(aftps.getAFTPData);//w

router.route('/missions').post(missions.postMissions);//x
router.route('/missions').get(missions.getMissions);//w

router.route('/aircraftdetail').post(aircraftdetail.postAircraftDetail);//x
router.route('/aircraftdetail').get(aircraftdetail.getAircraftDetail);//w for the first time

router.route('/AASFAFTPTotals').post(AASFAFTPTotals.postAASFTotals);//x





 module.exports=router;