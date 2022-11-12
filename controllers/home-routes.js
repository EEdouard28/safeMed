const router = require('express').Router();
const { Patient } = require('../models');


//GET homepage
router.get('/', (req, res) => {
  res.render('homepage', { layout: 'main' });
  //render
});

router.get('/patients', async (req, res) => {
  try {
    const patientData = await Patient.findAll({
    // *** We need a where clause if we create a relationship between patients and uer
    //  Currently patient is not link to user.
    //   where: {
    //     user_id: req.session.userId,
    //   },
    });
    const patients = patientData.map((patient) =>
      patient.get({ plain: true })
    );
    res.render('patients', {patients})
    // res.status(200).json(patients);

  } catch (err) {
    res
      .status(400)
      .json({ err, msg: 'Something is not right' });
  }
});

module.exports = router;
