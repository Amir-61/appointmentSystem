// 
// Just a sample custome API, which counts the number of future appointments 
//

module.exports = function (Appointment) {
    Appointment.countFutureAppointments = function (cb) {
        Appointment.find(function (err, appointments) {
            if (err) {
                console.error("appointment, ERR:", err);
                cb(err, null);
            } else {
                var count = appointments.reduce(function (p, c, i, a) {
                    if (Date.parse(c.appointmentDate) > new Date()) {
                        return ++p;
                    } else {
                        return p;
                    }
                }, 0);
                cb(null, count);
            }
        });
    };
    Appointment.remoteMethod('countFutureAppointments', {
        returns: {arg: 'count', type: 'object'},
        http: {path: '/countFutureAppointments', verb: 'post'}
    });
};
