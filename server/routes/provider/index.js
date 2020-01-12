const router = require("express").Router();
const { loginProvider, registerProvider } = require("../../controllers/auth");
const { eduValidator  } = require("../../validators");
const validate = require("express-validation");

const {
  getEducation,
  addEducation,
  deleteEducation,
  addEmployment,
  deleteEmployment,
  createProposal,
  getAllProposals,
  editProposal,
  getProposal
} = require("../../controllers/serviceProvider");

const { protect } = require('../../controllers/auth')




router
  .route('/proposal/:providerid', protect)
.get(getAllProposals)

router
.route('/proposal/:id',protect)
.put(editProposal)
.get(getProposal)





router
.route('/proposal',protect)
.post(createProposal)






module.exports = router;