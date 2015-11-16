var ejs = require('ejs');
var fs = require('fs');
var emailTemplate = fs.readFileSync('./server/templates/emailTemplate.ejs', 'utf-8');
module.exports = function (Appointment) {
  // `after save` operation hook for sending email when appointment is saved in DB
  Appointment.observe('after save', function filterProperties(ctx, next) {
    if (!ctx.instance)
      return next();

    // Finding the email address of the patent for whom the appointment is made
    Appointment.app.models.Patient.findOne({where: {id: ctx.instance.patientId}}, function (err, patient) {
      if (err)
        console.error("appointment, afterSave hook, patient.findone patientId:", ctx.instance.patientId, "ERR:", err);
      Appointment.app.models.Email.send({
        to: patient.email,
        from: Appointment.app.get('email'),
        subject: 'Confirmation Email from Appointment System',
        html: ejs.render(emailTemplate, {name: patient.name, appointmentDate: ctx.instance.appointmentDate})
      }, function (err) {
        if (err)
          console.error("appointment, afterSave hook: Email sending, ERR:", err);
        else
          console.log('appointment, afterSave hook: Email sending: email sent successfully');
      });
    })
    // Dont wait for Email.send callback; go to next immediately!
    next();
  });


  // 
  // Remote Method Name: countFutureAppointments
  // Remote Method Description: A sample custome API, which counts the number of future appointments 
  //
  Appointment.countFutureAppointments = function (cb) {
    Appointment.find(function (err, appointments) {
      if (err) {
        console.error("appointment.countFutureAppointments, ERR:", err);
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
