interface htmlAst {
  tag: string;
  ele: Element;
  attrs?: Record<string, string>;
  children?: Array<Element>;
}

export default class htmlCompiler {
  root: Element;
  constructor(node: Element) {
    this.root = node;
    this.htmlCompilerAst(node);
  }
  htmlCompilerAst(root:Element): htmlAst {
    console.log(root.tag);

    var ast: htmlAst;


    return ast;
  }
}
