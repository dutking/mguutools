const asyncHandler = require('express-async-handler')

const Feedback = require('../models/feedbackModel')

// @desc Get feedbacks
// @route GET /api/feedbacks
// @access Private
const getFeedbacks = asyncHandler(async (req, res) => {
    const feedbacks = await Feedback.find()
    res.status(200).json(feedbacks)
})

// @desc Set feedback
// @route POST /api/feedbacks
// @access Private
const setFeedback = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Введите Ваш отзыв.')
    }

    const feedback = await Feedback.create({
        text: req.body.text,
        user: req.body.user
    })

    res.status(200).json(feedback)
})

// @desc Update feedback
// @route PUT /api/feedbacks/:id
// @access Private
const updateFeedback = asyncHandler(async (req, res) => {

    const feedback = await Feedback.findById(req.params.id)

    if (!feedback){
        res.status(400)
        throw new Error("Запись не найдена.")
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedFeedback)
})

// @desc Delete feedback
// @route DELETE /api/feedbacks/:id
// @access Private
const deleteFeedback = asyncHandler(async (req, res) => {
    const feedback = await Feedback.findById(req.params.id)

    if (!feedback){
        res.status(400)
        throw new Error("Запись не найдена.")
    }

    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id)

    res.status(200).json(deletedFeedback)
})

module.exports = {
    getFeedbacks,
    setFeedback,
    updateFeedback,
    deleteFeedback
}