const passport = require('passport');
const express = require('express');
const router = express.Router();
const Score = require('../../models/Score');
const Question = require('../../models/Question');

const User = require('../../models/User');

//@route GET api/demo/public
//@desc Test Profile route
//@access PUBLIC
router.get('/public', (req, res) => {
  res.json({ msg: 'Public route' });
});

//@route GET api/demo/private
//@desc Test Profile route
//@access Private

router.get(
  '/private',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ msg: 'Protected route' });
  }
);

//Submit Answer
router.post(
  '/submit',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let count = 0;
    let negative = 0;
    Question.find().then(result => {
      result.forEach(question => {
        for (i in req.body.newArray) {
          if (
            i == question.questionId &&
            req.body.newArray[i] == question.answer
          ) {
            count = count + 3;
          }
          if (
            i == question.questionId &&
            req.body.newArray[i] != question.answer
          ) {
            negative++;
          }
        }
      });
      const finalScore = count - negative;
      console.log(req.user.email);
      User.updateOne({ _id: req.user.id }, { $set: { score: finalScore } })
        .then(result => console.log(result))
        .catch(err => console.log(err));
      console.log(count - negative);
    });
  }
);

//Post question
router.post('/', (req, res) => {
  let array = [];
  array.push({ value: 1, text: req.body.one });
  array.push({ value: 2, text: req.body.two });
  array.push({ value: 3, text: req.body.three });
  array.push({ value: 4, text: req.body.four });
  const newQuestion = {
    question: req.body.question,
    choices: array,
    answer: req.body.answer,
    questionId: randomString()
  };

  console.log(newQuestion);
  new Question(newQuestion)
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err));
});
//Delete question
router.delete('/', (req, res) => {
  Question.deleteMany().then(res.json({ message: 'Deleted' }));
});

//Get Question paginated
router.get('/', (req, res) => {
  var pageNo = parseInt(req.query.pageNo);
  var size = 10;
  var response = {};

  var query = {};
  if (pageNo < 0 || pageNo == 0) {
    response.error = true;
    response.message = 'invalid page number';
    return res.status(404).json(response);
  }

  query.skip = size * (pageNo - 1);
  query.limit = size;

  Question.find({}, {}, query, (err, result) => {
    if (err) {
      (response.error = true), (response.message = 'Error fetching data');

      return res.status(404).json(response);
    }

    if (result.length > 0) {
      const newArray = result.map(element => ({
        id: element.id,
        question: element.question,
        choices: element.choices,
        questionId: element.questionId
      }));

      res.json(newArray);
    } else {
      response.error = true;
      response.message = 'Error fetching data';
      res.json(response);
    }
  });
});

//Get all Question
router.get('/all', (req, res) => {
  Question.find((err, result) => {
    if (err) {
      (response.error = true), (response.message = 'Error fetching data');

      return res.status(404).json(response);
    }

    if (result.length > 0) {
      const newArray = result.map(element => ({
        id: element.id,
        question: element.question,
        choices: element.choices,
        questionId: element.questionId
      }));

      res.json(newArray);
    } else {
      response.error = true;
      response.message = 'Error fetching data';
      res.json(response);
    }
  });
});

/**
 * admin dashboard registered email
 */

router.get(
  '/dashboard',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find()
      .sort({ score: '-1' })
      .then(result => {
        const user = result.map(element => ({
          id: element.id,
          name: element.name,
          email: element.email,
          score: element.score
        }));
        const final = user.filter(result => req.user.id !== result.id);
        res.json(final);
      })
      .catch(err => console.log(err));
  }
);
/**
 * delete Ids
 */

router.delete(
  '/dashboard/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(res.json({ message: 'Deleted' }))
      .catch(err => console.log(err));
  }
);

/**
 * Generate random string
 */
const randomString = () => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (var i = 0; i < 7; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

module.exports = router;
