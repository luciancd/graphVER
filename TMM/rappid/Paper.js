class TMM_rappid_Paper extends joint.dia.Paper {

    pointermove(evt) {

        var cellView = this.sourceView;

        var parent = cellView && cellView.model.getAncestors()[0];

        if (this.currentCellScope && (parent == this.currentCellScope)) {
            return super.pointermove(evt);
        }

        if (parent) {
            // cancel move for the child (currently dragged element)
            cellView.pointerup(evt);

            var view = this.findViewByModel(parent);

            // substitute currently dragged element with the parent
            this.sourceView = view;

            // get parent's position and continue dragging (with the parent, children are updated automaticaly)
            var localPoint = this.snapToGrid({ x: evt.clientX, y: evt.clientY });
            view.pointerdown(evt, localPoint.x, localPoint.y);

        }

        return super.pointermove(evt);

    }
}