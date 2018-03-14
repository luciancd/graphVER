class TMM_rappid_cell_Behaviour {

    static highlightCell (cellView) {

        let me = this;
        let graph = this.model;

        graph.getCells().forEach(function(cell){
            cell.findView(me).unhighlight();
        });

        cellView.highlight();
    };


    static extractNextCellBetween (ancestorCell, childCell, returnFirstAncestorIfNotFound){

        let ancestors = childCell.getAncestors();
        let position = ancestors.indexOf(ancestorCell);
        console.log("index",position, ancestors);
        let nextCell = null;

        if (position>0) {

            nextCell = ancestors[position-1];

        } else if (position==0) {

            nextCell = childCell;
        }

        ancestors.unshift(childCell); // In case childCell = first ancestor
        if (!nextCell &&  returnFirstAncestorIfNotFound) {
            nextCell = ancestors[ancestors.length-1];
        }


        return nextCell;
    }

    static highlightCellWithinScope(targetedCellView) {

        let me = this;
        let graph = this.model;
        let targetedCell = targetedCellView.model;


        let nextCell = TMM_rappid_cell_Behaviour.extractNextCellBetween(this.currentCellScope, targetedCell, true);
        console.log(this.currentCellScope, targetedCell, nextCell);
        //this.currentCellScope.getEmbeddedCells();
        TMM_rappid_cell_Behaviour.unhighlightAll(this);

        TMM_rappid_cell_Behaviour.hideCellsNotInScope(this);

        nextCell.findView(this).highlight();
    };


    static hideCellsNotInScope(paper) {
        let opacityHL = {highlighter: {
                name: 'opacity'
            }};
        TMM_rappid_cell_Behaviour.highlightAllCellsOfPaper(paper,opacityHL);
        let scope = paper.currentCellScope;
        let cells = scope && scope.getEmbeddedCells({deep:true});

        cells && cells.unshift(scope);

        TMM_rappid_cell_Behaviour.unhighlightAllCellsOfPaper(paper,opacityHL,cells);
    }

    static unhighlightAll(paper) {

        let paperToUse = paper || this;
        // var me = this;
        // this.model.getCells().forEach(function(cell){
        //     cell.findView(me).unhighlight();
        // });
        //paperToUse.currentCellScope = null;
        TMM_rappid_cell_Behaviour.unhighlightAllCellsOfPaper(paperToUse);
        TMM_rappid_cell_Behaviour.hideCellsNotInScope(paperToUse);
    }

    static highlightAllCellsOfPaper(paper, highlightOptions,  specificCells) {

        let cells = specificCells || paper.model.getCells();

        cells.forEach(function(cell){
            cell.findView(paper).highlight(null,highlightOptions);
        });

        // this.currentCellScope = null;
    }

    static unhighlightAllCellsOfPaper(paper, highlightOptions,specificCells) {

        let cells = specificCells || paper.model.getCells();

        cells.forEach(function(cell){
                cell.findView(paper).unhighlight(null,highlightOptions);
            });

        // this.currentCellScope = null;
    }

    static extendParent (el, position) {

        var parent = el.getAncestors()[0];
        if (!parent) {
            return;
        }

        // var parentBB = parent.getBBox();
        // var elBB = el.getBBox();

        parent.fitEmbeds();

    };

    static forwardSelectToParent(cellView, position){

        let me = this;
        let graph = this.model;

        let parent = cellView.model.getAncestors()[0];

        cellView.model.getAncestors().forEach(function(ancestor){

        });

        console.log(parent);
        parent.findView(me).highlight();
        console.log(cellView);
        console.log("forward");
    }
}