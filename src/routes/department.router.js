"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */

const department = require('../controllers/department.controller')

// URL: /departments

router.route('/')
    .get(department.list)
    .post(department.create)

router.route('/:id')
    .get(department.read)
    .put(department.update)
    .patch(department.update)
    .delete(department.delete)

//Calling personnels from a specific department
router.get('/:id/personnels', department.personnels) //http://127.0.0.1:8000/departments/6601812d8ae721b1a4efffb2/personnels

/* ------------------------------------------------------- */
module.exports = router