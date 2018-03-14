tmmRappidScopeBehaviour = Backbone.Model.extend({

    initialize: function(options) {

        joint.util.bindAll(this, 'initBatchCommand', 'storeBatchCommand');

        this.graph = options.graph;

        this.reset();
        this.listen();
    },

    listen: function() {

        this.listenTo(this.graph, 'all', this.addCommand, this);

        this.listenTo(this.graph, 'batch:start', this.initBatchCommand, this);
        this.listenTo(this.graph, 'batch:stop', this.storeBatchCommand, this);
    }});