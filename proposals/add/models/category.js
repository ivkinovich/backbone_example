define(['Backbone'], function(Backbone) {

    return Backbone.Model.extend({
        defaults: {
            category_sid: 0,
            category_name: "",
            parent_sid: null,
            proposal_type: 0
        },
        initialize: function() {}
    });
});