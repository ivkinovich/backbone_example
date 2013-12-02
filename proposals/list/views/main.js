define([
    "jquery",
    "underscore",
    "Backbone",
    "apps/gsn/personal/proposals/list/views/proposal"
], function($, _, Backbone, ProposalView) {

    return Backbone.View.extend({
        el: $(".proposals_list"),

        initialize: function() {
            var that = this;

            new ProposalView({
                el: this.$el.find(".proposals_list_data"),
                proposalsCollection: that.options.proposalsCollection
            });

            this.options.proposalsCollection.fetch({
                data: {
                    proposalsType: this.getProposalsType()
                }
            });
        },

        getProposalsType: function() {
            return this.$el.attr("data-proposals-type");
        }
    });
});