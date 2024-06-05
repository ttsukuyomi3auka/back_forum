const ViewStatus = Object.freeze({
    PENDING: 'Pending',
    REJECTED: 'Rejected',
    APPROVED: 'Approved',
});

const Roles = Object.freeze({
    ADMIN: 'admin',
    USER: 'user',
    MODERATOR: 'moderator',
    BANED: 'baned',
});

module.exports = { ViewStatus, Roles };