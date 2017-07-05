function RunnerPlugin(){};

RunnerPlugin.prototype.apply = function(compiler){
    
    var runner = this;

    var CompilerEvents = [
        {event: "entry-option", type:"bailResult"},
        {event: "after-plugins", type:"sync"},
        {event: "after-resolvers", type:"sync"},
        {event: "environment", type:"sync"},
        {event: "after-environment", type:"sync"},
        {event: "before-run", type:"async"},
        {event: "run", type:"async"},
        {event: "watch-run", type:"async"},
        {event: "normal-module-factory", type:"sync"},
        {event: "context-module-factory", type:"sync"},
        
        {event: "before-compile", type:"async"},
        {event: "compile", type:"sync"},
        {event: "this-compilation", type:"sync"},
        {event: "compilation", type:"sync", 
            compilationEvents : [
                {event: 'normal-module-loader', type:"async"},,
                {event: 'seal', type:"async"},
                {event: 'optimize', type:"async"},
                {event: 'optimize-tree', type:"async", callback: this.onCompilationOptimizeTree},
                {event: 'optimize-modules', type:"async"},
                {event: 'after-optimize-modules', type:"async"},
                {event: 'optimize-chunks', type:"async"},
                {event: 'after-optimize-chunks', type:"async"},
                {event: 'revive-modules', type:"async"},
                {event: 'optimize-module-order', type:"async"},
                {event: 'optimize-module-ids', type:"async"},
                {event: 'after-optimize-module-ids', type:"async"},
                {event: 'record-modules', type:"async"},
                {event: 'revive-chunks', type:"async"},
                {event: 'optimize-chunk-order', type:"async"},
                {event: 'optimize-chunk-ids', type:"async"},
                {event: 'after-optimize-chunk-ids', type:"async"},
                {event: 'record-chunks', type:"async"},
                {event: 'before-hash', type:"async"},
                {event: 'after-hash', type:"async"},
                {event: 'before-chunk-assets', type:"async"},
                {event: 'additional-chunk-assets', type:"async"},
                {event: 'record', type:"async"},
                {event: 'additional-assets', type:"async"},
                {event: 'optimize-chunk-assets', type:"async"},
                {event: 'after-optimize-chunk-assets', type:"async"},
                {event: 'optimize-assets', type:"async"},
                {event: 'after-optimize-assets', type:"async"},
                {event: 'build-module', type:"async"},
                {event: 'succeed-module', type:"async"},
                {event: 'failed-module', type:"async"},
                {event: 'module-asset', type:"async"},
                {event: 'chunk-asset', type:"async"},
            ]},
        {event: "make", type:"parallel"},
        {event: "after-compile", type:"async"},
        {event: "should-emit", type:"bailResult"},
        {event: "need-additional-pass",  type:"bailResult"},
        {event: "additional-pass", type:"bailResult"},
        {event: "emit", type:"async"},
        {event: "after-emit", type:"async"},
        
        {event: "done", type:"sync"},
        {event: "failed", type:"sync"},
        {event: "invalid", type:"sync"},
        ];
    
    CompilerEvents.forEach(function(entry){
        compiler.plugin(entry.event, function(compilation, callback) {
            runner.onCompilerEvents(runner, compiler, entry , compilation, callback);
        });  
    });

    
};

RunnerPlugin.prototype.onCompilerEvents = function onCompilationEvents(runner, compiler, entry , compilation, callback){
    console.log("Runner Plugin>>" + entry.event);

    if(entry.callback && typeof entry.callback === 'function'){
        entry.callback(runner, compiler, entry , compilation, callback);
    }

    if(typeof compilation === 'string'){
        console.log("Runner Plugin>>" + compilation);
    }
    else if (typeof compilation === 'object' && compilation.plugin && entry.compilationEvents){
        entry.compilationEvents.forEach(function(e){
            compilation.plugin(e.event, function(com, callback){
                runner.onCompilationEvents(runner, e,  com, callback);
            });            
        });        
    }
    else if (typeof compilation === 'function'){
        compilation();
    }

    if(typeof callback === 'function'){
        callback();
    }
    else if(typeof callback === 'string'){
        console.log("Runner Plugin>>" + callback);
    }  
}

RunnerPlugin.prototype.onCompilationEvents = function onCompilationEvents(runner, entry, compilation, callback){
    console.log("Runner Plugin>>" + entry.event);

    if(entry.callback && typeof entry.callback === 'function'){
        entry.callback(runner, entry, compilation, callback);
    }

    if(typeof compilation === 'string'){
        console.log("Runner Plugin>>" + compilation);
    }
    else if(typeof compilation === 'function') {
        compilation();
    }

    if(typeof callback === 'string'){
       console.log("Runner Plugin>>" + callback);
    }else if(typeof callback === 'function'){
       callback();
    }

}

RunnerPlugin.prototype.onCompilationOptimizeTree = function onCompilationOptimizeTree(runner, entry, chunks, modules){
    debugger;
}

module.exports = RunnerPlugin;