module.exports = function (roles) {
    return function (req, res, next) {
        try {
            const userRoles = req.userData.roles
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            });
            if (!hasRole) {
                return res.status(405).send("You don't have access")
            }
            next()

        } catch (error) {
            console.log(error)
            res.status(500).send("Iternal server error")

        }
    }
}