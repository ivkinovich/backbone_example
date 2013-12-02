define([
    'underscore',
    'Backbone',
    'jquery',
    'template!../templates/file.html'
], function(_, Backbone, $, template) {

    return Backbone.View.extend({
        render : function(model) {
            this.$el.html(template());

            if(model.attributes.files[0].preview) {
                this.$('.img-container').html(model.attributes.files[0].preview);
            }
        }
    });
});