define([
    "jquery",
    "underscore",
    "Backbone",
    "text!apps/gsn/personal/proposals/list/templates/proposal.html",
    "cs!libs/utils_date_time"
], function($, _, Backbone, ProposalTemplate, UtilsDateTime) {

    return Backbone.View.extend({
        template: _.template(ProposalTemplate),

        initialize: function() {
            this.listenTo(this.options.proposalsCollection, "reset", this.render);
        },

        render: function() {
            var that = this;

            this.$el.html(this.template({
                proposalsCollection: that.options.proposalsCollection.toJSON(),
                utilsDateTime: UtilsDateTime
            }));

            return this;
        }
    });
});