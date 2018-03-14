class TMM_rappid_tree_Node {

    constructor(dataObj, parent) {

        var me = this;

        this.data = dataObj;
        this.children=[];
        this.rawSvg = null;
        this.parent = parent;

        this.rappidCell = null;

        let children = dataObj.children;

        children || (children=[]);

        children.forEach(function(el){

            if (me.keepElementOnInit(el)) {
                var newEl = new TMM_rappid_tree_Node(el, me);
                me.children.push(newEl);
            }
        });

    }



    keepElementOnInit(el) { // Falsch hier

        var acceptedTypes = ["Bauelement","Leitungselement","Teilanlagenelement","Modulelement"];

        var elType = el.type;

        return (elType && acceptedTypes.indexOf(elType)>-1);
;
    }

    getParent() {
        return this.parent;
    }

    getType(){
        return this.data.type || "noTypeSet";
    }

    getId(){
        return this.data.oraId || "noIdSet";
    }

    hasSvg() {
        return (["Bauelement","Leitungselement"].indexOf(this.getType())>-1);
    }

    isGroup() {
        return (["Teilanlagenelement","Modulelement"].indexOf(this.getType())>-1);
    }

    setRappidCell(cell){
        this.rappidCell = cell;
    }

    getRappidCell() {
        return this.rappidCell;
    }

    shouldBeDisplayed() {
        return this.isGroup() || this.hasSvg();
    }

    getX() {
        return this.convertValueToNumber("x_koord");
    }

    getY(){
        return this.convertValueToNumber("y_koord");
    }

    convertValueToNumber(attrName) {

        let value = this.data[attrName];
        //value = value.replace("-.","-0.");
        if (!value) {
            value = 0;
        }

        return  parseFloat(value);
    }

    getRoot(){

        if (!this.parent) {
            return this;
        }
        return this.parent.getRoot();
    }

    getEveryNode() {
        var me = this;
        let allChildren = [];
        allChildren.push(this);

        this.children.forEach(function(child){
            child.getEveryNode().forEach(function(subChild) {
                allChildren.push(subChild);
            })

        });

        return allChildren;
    }



}