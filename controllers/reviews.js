const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const campgound = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campgound.reviews.push(review);
    await review.save();
    await campgound.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/campgrounds/${campgound._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully delete review');
    res.redirect(`/campgrounds/${id}`);
}