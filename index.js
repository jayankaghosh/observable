(function () {
    const Observable = function (value) {
        this.currentValue = value;
        this.subscribers = [];
        this.__type__ = 'observable';
    }
    Observable.prototype = {
        subscribe: function (callback) {
            this.subscribers.push(callback);
        },
        value: function (value) {
             const self = this;
             if (value !== undefined) {
                 this.subscribers.forEach(function (subscriber) {
                     const newValue = subscriber(self.currentValue, value);
                     if (newValue !== undefined) {
                         value = newValue;
                     }
                 });
                 self.currentValue = value;
             } else {
                 return self.currentValue;
             }
         }
    }
    ObservableWrapper = function (defaultValue) {
        const observable = new Observable(defaultValue);
        const fn = observable.value.bind(observable);
        fn.subscribe = observable.subscribe.bind(observable);
        fn.__type__ = observable.__type__;
        return fn;
    }
    
    if (typeof module === "object" && typeof module.exports === "object") {
        module.observable = ObservableWrapper;
    } else if (typeof window === 'object') {
        window.observable = ObservableWrapper;
    }
})();
