// Good: Clean chaining
getUserData().then(processUserData).then(saveUserData).then(logSuccess).catch(handleError);

// Bad: Nested promises (callback hell in promise form)
getUserData()
  .then((user) => {
    processUserData(user)
      .then((processed) => {
        saveUserData(processed)
          .then(() => {
            logSuccess();
          })
          .catch(handleError);
      })
      .catch(handleError);
  })
  .catch(handleError);
