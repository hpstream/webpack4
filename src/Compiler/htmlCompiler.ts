interface htmlAst {
  tag?: string;
  ele: string;
  attrs?: Record<string, string>;
  children?: htmlAst[];
}
function toArray<T>(arrayLike: any): T[] {
  return [].slice.call(arrayLike);
}

export default class htmlCompiler {
  root: Element;
  constructor(node: Element) {
    this.root = node;
    console.log(this.htmlCompilerAst(node));
  }
  htmlCompilerAst(node:Element): htmlAst {
    console.log(node.attributes);
    if (node.nodeType===3){
      return;
    }
      var attrs = toArray<Attr>(node.attributes).reduce((res, cur) => {
        res[cur.name] = cur.value;
        return res;
      }, {});
    var childNodes = toArray<Element>(node.childNodes)
      .map((value)=>{
        return this.htmlCompilerAst(value);
      })
      .filter(n => n);

    var ast: htmlAst = {
      ele: node.tagName.toLowerCase(),
      attrs: attrs,
      children: childNodes
    };
    return ast;
  }
}
