// REQUIRED PACKAGES ===========================================================

// APIROUTER FUNCTION ==========================================================
module.exports = function(app, express) {
	var apiRouter = express.Router();

	var questionsRouter		= require('/api/questions')(app, express);
	apiRouter.use('/questions', questionsRouter);
	var answerRouter		= require('/api/answers')(app, express);
	apiRouter.use('/answers')
	var repairRouter		= require('/api/repair')(app, express);
	apiRouter.use('/repair', repairRouter);
	//REGISTERING ROUTES ---------------------
	return apiRouter;
};
