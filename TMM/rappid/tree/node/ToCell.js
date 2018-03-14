class TMM_rappid_tree_node_toCell {

    static convertNodeToCell(node, graph){

        if (!node.shouldBeDisplayed()) {
            return;
        }

        let newCell = null;

        if (node.isGroup()) {

            newCell = new joint.shapes.basic.Rect({
                position: { x: 100, y: node.getY() },
                // size: { width: 100, height: 30 },
                attrs: { rect: { fill: 'transparent',stroke:'transparent' }
                    //  text: { text: 'my box', fill: 'white' }
                }
            });
            newCell.akType = node.getType();


            let origin = new joint.shapes.basic.Rect({
                position: { x: 0, y: 0 },
                size: { width: 1, height: 1 },
                attrs: { rect: { fill: 'red' },
                    //  text: { text: 'my box', fill: 'white' }
                }
            });

            // newCell.embed(origin);
            // graph.addCell(origin);

        }

        if (node.hasSvg()) {

            let vbParams = TMM_util_SVG.extractViewboxValuesFromSvgHeader(node.rawSvg);

            let gap = 1;



            let width = vbParams[2]*1;
            let height = vbParams[3]*1;

            let transX = vbParams[0]*1;
            let transY = vbParams[1]*1;

            let xPos = transX+node.getX();
            let yPos = transY-node.getY();

            let data = node.data;


            newCell = new joint.shapes.basic.TMMSVG( {

                position: { x: xPos, y: yPos},
                size: { width:width,height:height},
                attrs: {
                    rect:{fill:"red"},

                    // text: { text: node.data.oraId },
                    image: { 'xlink:href': 'data:image/svg+xml,'+encodeURIComponent(node.rawSvg),width:width,height:height}
                }
            });
            newCell.akType = node.getType();

        }

        newCell && node.setRappidCell(newCell);

        return newCell;
    }

}