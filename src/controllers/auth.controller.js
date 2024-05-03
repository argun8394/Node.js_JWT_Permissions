"use strict"

const Personnel = require("../models/personnel.model")

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body

        if (username && password) {

            const user = await Personnel.findOne({ username, password })

            if (user) {

                if (user.isActive) {
                    //Login OK
                } else {
                    res.errorStatusCode = 401
                    throw new Error("This account is not active.")
                }
            } else {
                res.errorStatusCode = 401
                throw new Error("Wrong username  or password.")
            }
        } else {
            res.errorStatusCode = 401
            throw new Error("Please entry username and password.")
        }
    },

    refresh: async (req, res) => {

    },

    logout: async (req, res) => {

    }
}