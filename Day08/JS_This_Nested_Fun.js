const timer = {
    seconds: 0,
    
    start: function() {
        console.log(`Starting timer for ${this.seconds} seconds`);
        
        // Regular function loses `this` context
        setTimeout(function() {
            console.log(`Regular callback: ${this.seconds} seconds passed`);
            // This will be undefined or NaN
        }, 1000);
        
        // Arrow function preserves `this` from parent scope
        setTimeout(() => {
            console.log(`Arrow callback: ${this.seconds} seconds passed`);
            // This correctly refers to timer object
        }, 1000);
        
        // Solution for regular functions - bind `this`
        setTimeout(function() {
            console.log(`Bound callback: ${this.seconds} seconds passed`);
        }.bind(this), 1000);
    }
};

timer.seconds = 5;
timer.start();