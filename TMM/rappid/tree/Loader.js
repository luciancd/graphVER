class TMM_rappid_tree_Loader {


    static load(url, onFinishCb) {
        var me = this;

        //let url = "http://localhost/graphVer/resources/example_json/E1.json";


        let xhr = TMM_util_XHR.createXhrRequest("POST",url,function() {


            let rawTa = JSON.parse(this.responseText);
            var root = new TMM_rappid_tree_Node(rawTa);

            me.fetchSvgOfEveryNode(root,function(){
                onFinishCb(root);
            });

        });

        xhr.send();

    }

    static fetchSvgOfEveryNode(root, afterFetchCb) {// Falsch hier

        let urlTemplate  = "http://fact.upickit.de/svg/index.php?type=%type%&projekt=true&id=%id%&time=1519632122735&gap=1";
        let nodes = root.getEveryNode();

        nodes = nodes.filter(node => node.hasSvg());

        var numberOfNodes = nodes.length;
        var fetchedSvgs = [];

        nodes.forEach(function(node){


            if (node.hasSvg()) {

                let url = urlTemplate.replace("%type%",node.getType().toLowerCase()).replace("%id%",node.getId());
                let cb = function() {

                    var response = this.responseText || null;

                    node.rawSvg = response;

                    fetchedSvgs.push(response);

                    if (numberOfNodes == fetchedSvgs.length) {
                        afterFetchCb();
                    }
                }

               // console.log(url);
                let xhr = TMM_util_XHR.createXhrRequest("POST",url,cb,cb);
                xhr.send();
            }

        });

    }
}