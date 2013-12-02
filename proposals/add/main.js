define([
    'jquery',
    'underscore',
    './models/form',
    './views/form'
], function($, _, ProposalModel, ProposalView) {

    return {
        init: function() {
            var model = new ProposalModel();
            return new ProposalView({model: model});
        }
    };
});