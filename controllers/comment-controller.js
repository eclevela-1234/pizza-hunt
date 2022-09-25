const { Comment, Pizza } = require("../models");

const commentController = {
  // add comment to pizza
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No Pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.pizzaId })
      .then((deletedComment) => {
        if (!deletedComment) {
          res.status(404).json({ message: "No Pizza found with this id!" });
          return;
        }
        return Pizza.findByIdAndUpdate(
          { _id: params.pizzaId },
          { $pull: { commments: params.commentId } },
          { new: true }
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No Pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = commentController;
