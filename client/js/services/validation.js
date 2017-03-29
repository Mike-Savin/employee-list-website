var validation = function (ngToast) {
  var publicMethods = {
    message: function (type, messages) {
      if (!messages) {
        return;
      }

      if (messages.constructor === Array) {
        return messages.forEach(function (message) {
          publicMethods.message(type, message);
        });
      }

      if (typeof messages === 'object') {
        if (messages && messages.data && messages.data.error) {
          return publicMethods.message(type, messages.data.error);
        } else {
          // If 'messages' is an object of validation messages - convert it to array
          return publicMethods.message(type, Object.keys(messages).map(function (key) {
            return messages[key]
          }));
        }
      }

      ngToast[type]({
        content: messages
      });
    },

    success: function (messages) {
      publicMethods.message('success', messages);
    },

    danger: function (messages) {
      publicMethods.message('danger', messages);
    }
  };

  return publicMethods;
};

validation.$inject = ['ngToast'];
angular.module('app').factory('validation', validation);