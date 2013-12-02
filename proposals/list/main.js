define([
    "apps/gsn/personal/proposals/list/collections/proposals",
    "apps/gsn/personal/proposals/list/views/main"
], function(ProposalsCollection, MainView) {

    return {
        init: function() {
            var proposalsCollection = new ProposalsCollection();

            new MainView({proposalsCollection: proposalsCollection});
        }
    };
});