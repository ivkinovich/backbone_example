define(['underscore', 'Backbone', 'jquery'], function(_, Backbone, $) {

    return Backbone.View.extend({
        events: {
            'keyup input[type=text]'    : 'change',
            'change input[type=text]'   : 'change'
        },

        getTextInput : function() {
            return this.$el.find('input[type=text]');
        },

        getModelField : function() {
            return this.getTextInput().attr('id');
        },

        initialize: function() {
            _.bindAll(this);

            //this.render();
        },

        change : function(event) {
            var value = Number(this.getTextInput().val());

            if (!value) {
                value = 0;
            }

            this.model.set(this.getModelField(), value);
        },

        render : function(event) {}
    });
});