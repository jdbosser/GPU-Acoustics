function ListeningCamera(...args) {

    THREE.OrthographicCamera.apply(this, args);    
    
    let handler = {get: function(obj, prop) {
        console.log("Logging:", obj, prop);
        return obj[prop]
        }};


    this.listeners = {};
    
    // Try to change the position 
    let position_vector = this.position;

    let position_proxy = new Proxy(this.position, {set(obj, prop, value) {
        console.log("Proxy set position");
        position_vector[prop] = value;
        return true;}});
    
    let scope = this;


    return new Proxy(this, {get(obj, prop) {
        console.log("Proxy", obj, prop);
        // Go through all the listeners and return the correct proxy
        for ( const [listener_prop, val] of Object.entries(scope.listeners) ) {
            if(listener_prop == prop) {
                console.log("Found listening property");
                console.log(val);
            } 
        }
        return obj[prop];
    }, 
    set(obj, prop, value) {
        console.log("Proxy set", obj, prop, value);
        obj[prop] = value;
        return true;
    } });

    
};

ListeningCamera.prototype.constructor = ListeningCamera;

ListeningCamera.prototype = Object.create(THREE.OrthographicCamera.prototype);

ListeningCamera.prototype.addListener = function(listener) {
    if(!this.listeners[listener.property]) this.listeners[listener.property] = new Array();

    this.listeners[listener.property].push(listener.callback);

    /* 
    let propertyDescriptor = Object.getOwnPropertyDescriptor(this, listener.property); 
    
    let val = propertyDescriptor.value;
     
    console.log(propertyDescriptor);
     
    // Remove writable
    delete propertyDescriptor.writable;
    delete propertyDescriptor.value;
     
    // Add the getter 
    propertyDescriptor.set = function() {
        console.log("hej");
    };

     
    Object.defineProperty(this, listener.property, propertyDescriptor );

    // Check if successfull
    console.log(Object.getOwnPropertyDescriptor(this, listener.property));
    
    this[listener.property] = val;
    */
} 
