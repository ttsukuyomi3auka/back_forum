const ViewStatus = Object.freeze({
    PENDING: 'Pending',
    REJECTED: 'Rejected',
    APPROVED: 'Approved',
});

const Roles = Object.freeze({
    ADMIN: 'admin',
    USER: 'user',
    MODERATOR: 'moderator',
});

module.exports = { ViewStatus, Roles };