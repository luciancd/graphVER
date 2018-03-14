class TMM_util_SVG {

    static extractViewboxValuesFromSvgHeader(svgXml) {
        return svgXml.match(/viewBox="(.*?)"/)[1].split(" ");
    }

}