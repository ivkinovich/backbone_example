define([
    'underscore',
    'Backbone',
    'jquery',
    'apps/gsn/personal/proposals/add/views/field',
    'apps/gsn/personal/proposals/add/views/category',
    'apps/gsn/personal/proposals/add/views/subcategory',
    'apps/gsn/personal/proposals/add/views/textfield',
    'apps/gsn/personal/proposals/add/views/type',
    'apps/gsn/personal/proposals/add/views/activity'
], function(_, Backbone, $, ProposalFieldView, ProposalCategoryView, ProposalSubcategoryView, ProposalTextFieldView, ProposalTypeView, ProposalActivityView) {

    return Backbone.View.extend({
        el: $("#addNewProposal"),

        events: {
            "click a.cancel": "cancelProposal",
            "click .publicate a": "publishedProposal",
            "click a.save-draft": "saveProposal",
            "click .address_id_select": "setAddress",
            "click .metro_id_select": "setMetro",
            "click .currency_id_select": "setCurrency",
            "click .contract_checkbox": "checkContract"
        },

        initialize: function() {
            _.bindAll(this);
            this.model.bind("invalid", this.showError, this);
            var self = this;
            new ProposalFieldView({
                model : this.model,
                el: this.$('#cost_block')
            });

            new ProposalTypeView({
                model : this.model,
                el: this.$('#proposal_types'),
                parentEl: this.$el
            });

            new ProposalCategoryView({
                model : this.model,
                el: this.$('#choicesCategories')
            });
            new ProposalSubcategoryView({
                model : this.model,
                el: this.$('#subcategories')
            });

            new ProposalTextFieldView({
                model : this.model,
                el: this.$('#desc')
            });

            new ProposalActivityView({
                model : this.model,
                el: this.$('#ProposalActivity')
            });
            this.model.set("currency_id", this.$el.find(".currency_id_select :first").val());
        },

        render: function() {},

        cancelProposal: function() {
            window.location = "/gsn_proposals/" + this.model.get("proposal_type") + "/";
        },

        publishedProposal: function(e) {
            this.model.set('status', 'published');
            this.saveProposal(e);
        },
        showError: function(model) {
            $('.error-message.main-err-msg').empty();
            _.each(this.model.validationError, function(error){
                $('.error-message.main-err-msg').append($('<div>').addClass("field-set-error-text").text(error.message));

            });
        },
        hideError: function() {
            $('.error-message.main-err-msg').empty();
        },

        saveProposal: function(e) {
            e.preventDefault();
            var self = this;
            self.hideError();
            var type = self.model.get("proposal_type");
            this.model.save(null, {
                success: function(model, response) {
                    window.location = "/gsn_proposals/" + type + "/";
                },
                error: function(model, response) {
                    $('.error-message.main-err-msg').html("Произошла ошибка добавления");
                    console.log("error", model, response);
                },
                validate: true,
                wait: true // Add this
            });
        },

        setAddress: function() {
            this.model.set("address_id", this.$el.find(".address_id_select :selected").val());
        },

        setMetro: function() {
            this.model.set("metro_id", this.$el.find(".metro_id_select :selected").val());
        },

        setCurrency: function() {
            this.model.set("currency_id", this.$el.find(".currency_id_select :selected").val());
        },

        checkContract: function(e) {
            var isChecked = $(e.currentTarget).is(":checked");
            $(".cost_input, .currency_id_select").prop("disabled", isChecked);
            this.model.set("is_price_negotiated", isChecked);
        },

        addUploadName: function(name) {
            var uploads = this.model.get("uploads") || "";

            this.model.set("uploads", uploads ? uploads += ";" + name : name);
        }
    });
});