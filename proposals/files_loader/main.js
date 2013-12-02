define(["./views/main"], function(MainView) {
    return {
        init: function(proposalsInstance) {
            new MainView({proposalsInstance: proposalsInstance});
        }
    }
});