const router = require("express").Router();


const {
  createJob,
  deleteJob,
  getJob,
  updateJob,
  getAllJob,
  jobSearch
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
const { signup, login, protect } = require("../../controllers/auth");




router.post("/signup", signup);

router.put("/updateclientinfo/:id", protect, updateDesc);

router.post("/login", login);

router.post("/newjob", createJob);
router.get("/job/search", jobSearch)

router.get('/job/:id', getJob);
router.get("/jobslist", getAllJob);




router.route("/skills/:id", protect).put(addSkill);


router.route("/skills/:id/:skillid", protect).delete(deleleteSkill);


router.route("/employment/:id", protect).put(addEmployment);

router.route("/employment/:id/:empid", protect).delete(deleteEmployment);


router.route("/education/:id/:educationid", protect).delete(deleteEducation);

router
  // .get(getEducation)
  .route("/education/:id", protect)
  .put(addEducation);



router.put('/jobupdate/:id', updateJob);






module.exports = router;