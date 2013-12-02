define([
    'underscore',
    'Backbone',
    'jquery',
    'apps/gsn/personal/proposals/add/views/field',
], function(_, Backbone, $, ProposalFieldView) {

    return ProposalFieldView.extend({
        events: {
            'keyup textarea': 'changeTextarea',
            'change textarea': 'changeTextarea',
            'keyup input[type=text]': 'changeTitle',
            'change input[type=text]'   : 'changeTitle'
        },

        changeTitle : function(event) {
            this.model.set(this.getModelField(), this.getTextInput().val());
        },

        changeTextarea : function(event) {
            this.model.set(this.$el.find('#description').attr("id"), this.$el.find('#description').val());
        }
    });
});