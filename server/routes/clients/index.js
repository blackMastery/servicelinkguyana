const router = require("express").Router();


const {
  createJob,
  deleteJob,
  getJob,
  updateJob,
  getAllJob
} = require("../../controllers/jobs");

const {
  createClient,
  updateClient,
  updateDesc,
  addEducation,
  deleteEmployment,
  addEmployment,
  deleteEducation,
  addSkill,
  deleleteSkill
} = require("../../controllers/user");
const { signup, login } = require('../../controllers/auth')




router.post("/signup", signup);

router.put("/updateclientinfo/:id", updateDesc);

router.post("/login", login);

router.post("/newjob", createJob);

router.get('/job/:id', getJob);
router.get("/jobslist", getAllJob);



router.route("/skills/:id")
.put(addSkill)


router.route("/skills/:id/:skillid").delete(deleleteSkill);


router.route("/employment/:id")
  .put(addEmployment)

router.route("/employment/:id/:empid")
  .delete(deleteEmployment);


router.route("/education/:id/:educationid")
  .delete(deleteEducation);

router
  .route("/education/:id")
  // .get(getEducation)
  .put(addEducation)



router.put('/jobupdate/:id', updateJob);






module.exports = router;