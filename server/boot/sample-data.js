// server/boot/sample-data.js
var async = require('async');

// Initial data for different models
var patients = require("../initialData/patients")['patients'];
var physicians = require("../initialData/physicians")['physicians'];
var users = require("../initialData/users")['users'];

module.exports = function (server, done) {
  console.log('sample-data, Importing sample data...');
  async.parallel({
    insert_physicians_appointments: function (callback) {
      server.dataSources.mysqlDs.automigrate(['Physician', 'Appointment'], function (err) {
        if (err) {
          console.error("sample-data.insert_physicians_appointments, ERR:", err);
          callback(err, null);
        } else {
          var PhysicianModel = server.models.Physician;
          async.each(physicians, function (Physician, next) {
            var appointments = Physician.appointments || [];
            delete Physician.appointments;
            PhysicianModel.create(Physician, function (err, physician) {
              console.log("sample-data.insert_physicians_appointments, physician:", physician);
              if (err)
                return next(err, null);
              var AppointmentModel = server.models.Appointment;
              async.each(appointments, function (appointment, cb) {
                console.log("sample-data.insert_physicians_appointments, appointment:", appointment);
                //physician.appointments.create(appointment, cb);
                AppointmentModel.create(appointment, cb);
              }, next);
            });
          }, callback);
        }
      });
    },
    insert_users: function (callback) {
      server.dataSources.mysqlDs.automigrate('user', function (err) {
        if (err) {
          console.error("sample-data.insert_users, ERR:", err);
          callback(err, null);
        } else {
          async.each(users, function (user, cb) {
            console.log("sample-data.insert_users, user:", user);
            var User = server.models.user;
            User.create(user, function (err, data) {
              cb(err, data);
            });
          }, callback);
        }
      });
    },
    insert_patients: function (callback) {
      server.dataSources.mysqlDs.automigrate('Patient', function (err) {
        if (err) {
          console.error("sample-data.insert_patients, ERR:", err);
          callback(err, null);
        } else {
          async.each(patients, function (patient, cb) {
            console.log("sample-data.insert_patients, patient:", patient)
            var Patient = server.models.Patient;
            Patient.create(patient, function (err, data) {
              cb(err, data);
            });
          }, callback);
        }
      });
    }
  }, function (err, results) {
    if (err)
      console.error("sample-data, ERR:", err);
    done(err);
  });
};