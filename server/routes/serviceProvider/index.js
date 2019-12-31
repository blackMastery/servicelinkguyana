const router = require("express").Router();
const { loginProvider, registerProvider } = require("../../controllers/auth");
const { eduValidator  } = require("../../validators");
const validate = require("express-validation");

const {
  getEducation,
  addEducation,
  deleteEducation,
  addEmployment,
  deleteEmployment
} = require("../../controllers/serviceProvider");



router
.route("/education/:providerid/:educationid")
.delete(deleteEducation);

  router.route("/employment/:providerid/:empid")
  .delete(deleteEmployment);

router
  .route("/education/:providerid")
  .get(getEducation)
  .put(addEducation)

  router.route("/employment/:providerid")
  .post(addEmployment)


router.post('/login', loginProvider);
router.post('/register', registerProvider);





module.exports = router;