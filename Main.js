function main(container) {

    var graph = new joint.dia.Graph;
    var commandManager = new joint.dia.CommandManager({ graph: graph });
    var keyboard = new joint.ui.Keyboard;



    var paper = new TMM_rappid_Paper({
        currentCellScope:null,
        el: container,
        width: 900,
        height: 900,
        model: graph,
        gridSize: 0.1,
        highlighting: {
            'default': {
                name: 'stroke',
                options: {
                    padding: 3,
                    attrs: {
                        'stroke-width': 3,
                        stroke: '#ffe600'
                    }
                }
            }}
    });

    keyboard.on('ctrl+z', function() { commandManager.undo() });
    keyboard.on('ctrl+y', function() { commandManager.redo() });

    paper.scale(4);


    paper.on('cell:pointerdblclick', function(cellView) {

        var me = this;

        let targetedCell = cellView.model;

        if (targetedCell.getEmbeddedCells().length == 0) {

            let parent = targetedCell.getAncestors()[0];

            parent = parent || targetedCell; // In case there is no parent

            targetedCell = parent;
        }

        currentCell = TMM_rappid_cell_Behaviour.extractNextCellBetween(me.currentCellScope, targetedCell, true);

        me.currentCellScope = currentCell;

        TMM_rappid_cell_Behaviour.unhighlightAllCellsOfPaper(this);
        TMM_rappid_cell_Behaviour.hideCellsNotInScope(this);

        //currentCell.toFront({deep:true});
        currentCell.findView(me).highlight();

    });

    paper.on('cell:pointerdown', TMM_rappid_cell_Behaviour.highlightCellWithinScope);

    //paper.on('cell:pointerdown', TMM_rappid_cell_Behaviour.forwardSelectToParent);

    paper.on("blank:pointerdblclick",function() {
        this.currentCellScope = null;
        TMM_rappid_cell_Behaviour.unhighlightAll(this);
    });


    paper.on('cell:pointermove', function (cellView, evt) {

        return;
        console.log("my pointermove");
        //var me = this;
        if (cellView.model.isLink()) {
            return ;
        }

        var parent = cellView.model.getAncestors()[0];

        if (this.currentCellScope && (parent == this.currentCellScope)) {
            return;
        }

        if (parent) {

            // cancel move for the child (currently dragged element)
            cellView.pointerup(evt);

            var view = paper.findViewByModel(parent);

            // substitute currently dragged element with the parent
            paper.sourceView = view;

            // get parent's position and continue dragging (with the parent, children are updated automaticaly)
            var localPoint = paper.snapToGrid({ x: evt.clientX, y: evt.clientY });
            view.pointerdown(evt, localPoint.x, localPoint.y);
        }
    });

   // graph.on('change:size', highlightSelectedElement);


    var initTree = function(rootNode) {


        let createdCells = [];
        let currentParent = null;

        rootNode.getEveryNode().forEach(function(node){

            TMM_rappid_tree_node_toCell.convertNodeToCell(node, graph);

        });

        let newCells = [];
        rootNode.getEveryNode().forEach(function(node){
            let cell = node.getRappidCell();

            let parent = node.getParent();

            parent && parent.getRappidCell().embed(cell);


            cell.on('change:position', TMM_rappid_cell_Behaviour.extendParent);
            cell.on('change:size',TMM_rappid_cell_Behaviour.extendParent);

            newCells.push(cell);
        });

        commandManager.initBatchCommand();
        graph.addCells(newCells);


        rootNode.getRappidCell().fitEmbeds();
        rootNode.getRappidCell().translate(1,230);

        rootNode.getEveryNode().forEach(function(node){

            if (node.isGroup()) {
                node.getRappidCell().translate(node.getX(),node.getY());
            }

        });
        commandManager.storeBatchCommand();
    };

    TMM_rappid_tree_Loader.load("http://localhost/graphVer/resources/example_json/E4.json",initTree);


};