const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");

const Urgence = require("../models/Urgence");

const auth = require("../midleware/auth");

//@route  Get /api/equipeAmbulancie
//@desc  get all equipe ambulancier
//@access private

// let today = new Date();

// let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
router.get("/", auth, async (req, res) => {


  try {
 
    const ugences = await Urgence.find({
      user: req.user.id,
      dateUrgence: {"$gte": new Date('2020-02-01'), "$lt": new Date('2020-03-01')}
      
    });

    res.json(ugences);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", auth, async (req, res) => {


  try {
    const urgence = await Urgence.findById(req.params.id);

    res.json(urgence);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route   post /api/urgence
//@desc    create all equipe ambulancier
//@access   private
router.post("/", auth, async (req, res) => {
  const {
    dateUrgence,
    vacation,
    heureUrgence,
    numMobile,
    pointFixe,
    nomAppelant,
    nomPatient,
    telephone,
    lieuxRecuperaion,
    commune,
    age,
    hopital,
    sex,
    natureCas,
    Diagnostiques,
    PremierSoins,
    MilleageAller,
    MilleageRetour,
    listHopRefusantPatient,
    commentaires,
    autre
  } = req.body;

  try {
    const newContact = new Urgence({
      dateUrgence,
      vacation,
      heureUrgence,
      numMobile,
      pointFixe,
      nomAppelant,
      nomPatient,
      telephone,
      lieuxRecuperaion,
      commune,
      age,
      hopital,
      sex,
      natureCas,
      autre,
      Diagnostiques,
      PremierSoins,
      MilleageAller,
      MilleageRetour,
      listHopRefusantPatient,
      commentaires,
     

      user: req.user.id
    });

    const urgence = await newContact.save();

    res.json(urgence);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    Put /api/equipeAmbulancie/:id
//@desc     update all equipe ambulancier
//@access   private
router.put("/:id", auth, async (req, res) => {
  const {
    dateUrgence,
    vacation,
    heureUrgence,
    numMobile,
    pointFixe,
    nomAppelant,
    nomPatient,
    telephone,
    lieuxRecuperaion,
    commune,
    age,
    hopital,
    sex,
    natureCas,
    Diagnostiques,
    PremierSoins,
    MilleageAller,
    MilleageRetour,
    listHopRefusantPatient,
    commentaires,
    autre
  } = req.body;

  //build urgence object

  const urgenceField = {};
  if (commentaires) urgenceField.commentaires = commentaires;
  if (listHopRefusantPatient)
    urgenceField.listHopRefusantPatient = listHopRefusantPatient;
  if (MilleageRetour) urgenceField.MilleageRetour = MilleageRetour;
  if (MilleageAller) urgenceField.MilleageAller = MilleageAller;
  if (PremierSoins) urgenceField.PremierSoins = PremierSoins;
  if (Diagnostiques) urgenceField.Diagnostiques = Diagnostiques;
  if (natureCas) urgenceField.natureCas = natureCas;
  if (sex) urgenceField.sex = sex;
  if(autre) urgenceField.autre = autre;
  if (vacation) urgenceField.vacation = vacation;
  if (heureUrgence) urgenceField.heureUrgence = heureUrgence;
  if (numMobile) urgenceField.numMobile = numMobile;
  if (pointFixe) urgenceField.pointFixe = pointFixe;
  if (nomAppelant) urgenceField.nomAppelant = nomAppelant;
  if (nomPatient) urgenceField.nomPatient = nomPatient;
  if (telephone) urgenceField.telephone = telephone;
  if (age) urgenceField.age = age;
  if (hopital) urgenceField.hopital = hopital;
  if (lieuxRecuperaion) urgenceField.lieuxRecuperaion = lieuxRecuperaion;
  if (commune) urgenceField.commune = commune;
  if (dateUrgence) urgenceField.dateUrgence = dateUrgence;

  try {
    let urgence = await Urgence.findById(req.params.id);
    if (!urgence) res.status(404).json({ msg: "Contact not found" });

    // make sure user own a contact

    if (urgence.user.toString() !== req.user.id) {
      res.status("401").json({ msg: "Unauthorized" });
    }

    const updatedContact = await Urgence.findByIdAndUpdate(
      req.params.id,
      {
        $set: urgenceField
      },
      {
        new: true
      }
    );

    res.json(updatedContact);
  } catch (err) {}
});

//@route    Put /api/equipeAmbulancie
//@desc     delete all equipe ambulancier
//@access   private

router.delete("/:id", auth, async (req, res) => {
  //build urgence object

  try {
    let urgence = await Urgence.findById(req.params.id);
    if (!urgence) res.status(404).json({ msg: "Contact not found" });

    // make sure user own a contact

    if (urgence.user.toString() !== req.user.id) {
      res.status("401").json({ msg: "Unauthorized" });
    }

    await Urgence.findByIdAndRemove(req.params.id);
    res.json({ msg: " Contact Removed" });
  } catch (err) {}
});

module.exports = router;
