joint.shapes.basic.TMMSVG = joint.shapes.basic.Generic.extend({

    markup: '<g class="rotatable"><g class="scalable"><rect/></g><image /><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'basic.TMMSVG',
        //size: { width: 100, height: 60 },
        attrs: {
            //'rect': { fill: '#FFFFFF', stroke: 'transparent', width: 0, height: 0 },
            'text': { 'font-size': 14, text: '', 'ref-x': 0, 'ref-y': 0, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle', fill: 'black' },
            'image': { 'ref-x': 0, 'ref-y': 0 }
        }

    }, joint.shapes.basic.Generic.prototype.defaults)
});