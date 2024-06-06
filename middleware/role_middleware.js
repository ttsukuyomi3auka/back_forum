module.exports = function (roles) {
    return function (req, res, next) {
        try {
            const userRole = req.userData.role

            if (!roles.includes(userRole)) {
                return res.status(405).send("You don't have access");
            }
            next()

        } catch (error) {
            console.log(error)
            res.status(500).send("Iternal server error")

        }
    }
}