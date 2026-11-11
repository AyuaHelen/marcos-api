const project = require('../db/models/project');
const user = require('../db/models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// do not leak password / deletedAt of the user in joined results
const userInclude = {
  model: user,
  attributes: { exclude: ['password', 'deletedAt'] },
};

const createProject = catchAsync(async (req, res, next) => {
  const body = req.body;
  const userId = req.user.id;

  const newProject = await project.create({
    title: body.title,
    productImage: body.productImage,
    price: body.price,
    shortDescription: body.shortDescription,
    description: body.description,
    productUrl: body.productUrl,
    category: body.category,
    tags: body.tags,
    createdBy: userId,
  });

  return res.status(201).json({
    status: 'success',
    data: newProject,
  });
});

const getAllProjects = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const result = await project.findAll({
    include: userInclude,
    where: { createdBy: userId },
  });

  return res.json({
    status: 'success',
    data: result,
  });
});

const getProjectById = catchAsync(async (req, res, next) => {
  const projectId = req.params.id;
  const result = await project.findByPk(projectId, { include: userInclude });

  if (!result) {
    return next(new AppError('Invalid project id', 400));
  }

  return res.json({
    status: 'success',
    data: result,
  });
});

const updateProject = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.params.id;
  const body = req.body;

  // only the creator can update
  const result = await project.findOne({
    where: { id: projectId, createdBy: userId },
  });

  if (!result) {
    return next(new AppError('Invalid project id', 400));
  }

  const fields = [
    'title',
    'productImage',
    'price',
    'shortDescription',
    'description',
    'productUrl',
    'category',
    'tags',
  ];
  fields.forEach((field) => {
    if (body[field] !== undefined) result[field] = body[field];
  });

  const updatedResult = await result.save();

  return res.json({
    status: 'success',
    data: updatedResult,
  });
});

const deleteProject = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.params.id;

  const result = await project.findOne({
    where: { id: projectId, createdBy: userId },
  });

  if (!result) {
    return next(new AppError('Invalid project id', 400));
  }

  await result.destroy(); // soft delete (paranoid)

  return res.json({
    status: 'success',
    message: 'Record deleted successfully',
  });
});

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
