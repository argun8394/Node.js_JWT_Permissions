"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */

const department = require('../controllers/department.controller')
const permissions = require('../middlewares/permissions')

// URL: /departments

router.route('/')
    .get(permissions.isLogin, department.list)
    .post(department.create)

router.route('/:id')
    .get(permissions.isAdminOrLead, department.read)
    .put(permissions.isAdminOrLead, department.update)
    .patch(permissions.isAdminOrLead, department.update)
    .delete(permissions.isAdmin, department.delete)

//Calling personnels from a specific department
router.get('/:id/personnels', permissions.isAdminOrLead, department.personnels) //http://127.0.0.1:8000/departments/6601812d8ae721b1a4efffb2/personnels

/* ------------------------------------------------------- */
module.exports = router