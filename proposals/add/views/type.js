define([
    'underscore'
    , 'Backbone'
    , 'jquery'
], function(_, Backbone, $) {

    return Backbone.View.extend({
        events: {
            "click ul.tabs li.current p a": "selectProposalType"
        },

        initialize: function() {
            _.bindAll(this);
            this.model.set({proposal_type: this.options.parentEl.data("type")});
        },

        selectProposalType: function(e) {
            e.preventDefault();
            this.model.set({proposal_type: $(e.currentTarget).data('type')});
            this.model.set({category_id: null, subcategory_id: null});
            $("#subcategories").hide();
            $("div.field div.detailNav ul.tabs li.current").removeClass('active');
            $(e.currentTarget).closest("li.current").addClass('active');

            history.pushState(null, null, '/gsn_proposals/' + this.model.get('proposal_type') + '/add/');

        }
    });
});