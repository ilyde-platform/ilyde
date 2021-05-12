import React, {Fragment, useState, useEffect} from 'react';
import TableCozy from './TableCozy';
import { Card, Breadcrumb } from 'react-bootstrap';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markup';
import _ from 'lodash';

export function FileExplorer({name, columns, tree, handleOpenFile}){
  const [currPath, setCurrPath] = useState('');
  const [isFolderView, setIsFolderView] = useState(true);
  const [code, setCode] = useState({value: "", lang: "markup"});

  useEffect(() => {
    setCurrPath('');
    setIsFolderView(true);
  },[tree]);

  const handleSubPathClick = (event) => {
    event.preventDefault();
    setCurrPath(currPath.split('/').slice(0, +event.target.parentNode.getAttribute("data-index") + 1).join("/"));
    setIsFolderView(true);
  }

  const handleRootPathClick = (event) => {
    event.preventDefault();
    setCurrPath('');
    setIsFolderView(true);
  }

  const handleFileRowClick = (d) => {
    const pathPrefix = currPath ? currPath + "/" + d.name : d.name;
    setCurrPath(pathPrefix);
    if (d.is_dir){
      setIsFolderView(true);
    }
    else{
      if(handleOpenFile){
        const lan = d.name.endsWith(".py") ? "py" : "markup";
        handleOpenFile(d.absolutePath).then((content) => {
          setCode({value: content, lang: lan});
          setIsFolderView(false);
        })
      }
    }
  }

  const getBreadcrumbItems = () => {
    const items = currPath.split('/').filter((item) => item !== '');
    const len = items.length;

    return (
      items.map((item, index) => {
        if (index + 1 === len){
          return <Breadcrumb.Item key={index} active>{ item }</Breadcrumb.Item>
        }
        return <Breadcrumb.Item key={index} href="#" data-index={index} onClick={handleSubPathClick}>{ item }</Breadcrumb.Item>
      })
    )
  }

  const tableColumns = columns.map((col) => {
    return   {
        id: col,
        headerText: "",
        sortable: false,
        type: "text",
        style: "normal",
      }
  });

  const tableOptions = {
    onRowClick: handleFileRowClick,
    defaultSortCol: "is_dir",
    defaultSortDir: "desc",
  };

  return (
    <Fragment>
      <Breadcrumb className="mb-0">
        <Breadcrumb.Item href="#" key="-1" onClick={handleRootPathClick}>{name}</Breadcrumb.Item>
        {getBreadcrumbItems()}
      </Breadcrumb>
      {isFolderView ?
        <TableCozy columns={tableColumns} data={listFiles(tree, currPath)} options={tableOptions}/> :
        <Card>
          <Card.Body>
            <Editor
              value={code.value}
              onValueChange={c => setCode({value: c, ...code})}
              highlight={c => highlight(c, languages[code.lang])}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                boder: 'none'
              }}/>
          </Card.Body>
        </Card>
      }
    </Fragment>
  )
}

function listFiles(tree, prefix){
  const subtree = prefix ? tree.filter((file) => file.name.startsWith(prefix)) : tree;
  const files = subtree.map((item) => {
    const name = prefix ? item.name.slice(prefix.length + 1) : item.name;
    return {...item, name: name, absolutePath: item.name};
  }).map((item) => {
    if(item.name.includes('/')){
      return {...flushObjProperties(item, ['name']), name: item.name.split("/")[0], is_dir: 1};
    }
    return {...item, name: item.name, is_dir: 0};
  });
  return _.sortBy(_.uniqBy(files, 'name'), ['is_dir', 'name'], ['desc', 'asc']);
}

function flushObjProperties(obj, excludes){
  const props = _.keys(obj);
  let res = {};
  for (let prop of props){
    if(excludes.includes(prop)){
      continue;
    }
    res[prop] = "";
  }
  return res;
}
