define([
    "Backbone",
    "apps/gsn/personal/proposals/list/models/proposal"
], function(Backbone, ProposalModel) {

    return Backbone.Collection.extend({
        url: "/api/gsn_proposals/proposals",
        model: ProposalModel,

        parse: function(response) {
            return response.proposals;
        }
    });
});