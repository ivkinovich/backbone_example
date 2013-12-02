define(['Backbone', '../models/file'], function(Backbone, FileModel){

    return Backbone.Collection.extend({
        model: FileModel
    });

});

