### Usage

    const value = window.observable(5);
    value.subscribe(function (oldValue, newValue) {
      console.log("Old: " + oldValue);
      console.log("New: " + newValue);
    });
    console.log(value()); // 5
    value(7); // Old: 5 New: 7
