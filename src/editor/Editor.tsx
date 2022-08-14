import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {$createParagraphNode, $createTextNode, $getRoot, TextNode} from "lexical";
import {TreeView} from "@lexical/react/LexicalTreeView";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$createSearchNode, SearchNode} from "./SearchNode";
import {useLexicalTextEntity} from "@lexical/react/useLexicalTextEntity";
import {useCallback} from "react";
import {PlainTextPlugin} from "@lexical/react/LexicalPlainTextPlugin";

interface Props {
  txt: string;
  searchString: string;
}


function ShowTreeView() {
  const [editor] = useLexicalComposerContext();

  return <TreeView editor={editor} timeTravelButtonClassName={''} timeTravelPanelButtonClassName={''}
                   timeTravelPanelClassName={''} timeTravelPanelSliderClassName={''} viewClassName={''}/>;
}

function Highlight(props: {searchString: string}) {
  const getSearchMatch = useCallback((text: string) => {
    if (props.searchString === '') {
      return null;
    }

    const index = text.indexOf(props.searchString);
    if (index >= 0) {
      return {
        start: index,
        end: index + props.searchString.length,
      }
    } else {
      return null;
    }
  }, [props.searchString]);

  const createSearchNode = useCallback((textNode: TextNode): SearchNode => {
    return $createSearchNode(textNode.getTextContent());
  }, []);

  useLexicalTextEntity(getSearchMatch, SearchNode, createSearchNode);
  return null;
}

export const Editor = (props: Props) => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme: {
      search: 'search-match'
    },
    nodes: [SearchNode],
    onError: (e: Error) => console.log(e),
    editorState: () => {
      const root = $getRoot();
      const paragraph = $createParagraphNode();
      paragraph.append($createTextNode(props.txt));
      root.append(paragraph);
    }
  };
  return (
    <LexicalComposer initialConfig={initialConfig}>
      {/*<PlainTextPlugin contentEditable={<ContentEditable/>} placeholder={<div>hello</div>}/>*/}
      <RichTextPlugin
        contentEditable={<ContentEditable/>}
        placeholder=""
      />
      <Highlight searchString={props.searchString}/>
      <ShowTreeView/>
    </LexicalComposer>
  )
}
