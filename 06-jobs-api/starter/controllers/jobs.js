require('dotenv').config();
const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors/index');

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({
        createdBy: req.user._id
    }).sort('createdAt');
    res.status(StatusCodes.OK).json({ count: jobs.length, jobs});
}

const getJob = async (req, res) => {
    const { user: { _id: userId }, params: { id: jobId } } = req;
    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    });
    if (!job) {
        throw new NotFoundError(`No Job With ID: ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ job });
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user._id;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
}

const updateJob = async (req, res) => {
    const { 
        user: { _id: userId }, 
        params: { id: jobId }, 
        body: { company, position }
    } = req;

    if (!company || !position) {
        throw new BadRequestError('Company Or Position Fields Cannot Be Empty');
    }

    const job = await Job.findOneAndUpdate({
        _id: jobId,
        createdBy: userId
    }, req.body, {
        new: true,
        runValidators: true
    });

    if (!job) {
        throw new NotFoundError(`No Job With ID: ${jobId}`);
    }

    res.status(StatusCodes.OK).json({ job });
}

const deleteJob = async (req, res) => {
    const { 
        user: { _id: userId }, 
        params: { id: jobId }, 
    } = req;

    const job = await Job.findOneAndRemove({
        _id: jobId,
        createdBy: userId
    });

    if (!job) {
        throw new NotFoundError(`No Job With ID: ${jobId}`);
    }

    res.status(StatusCodes.OK).json({ job });
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
};