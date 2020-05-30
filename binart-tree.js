node = {
  value: null,
  left: null,
  right: null,
}

insertTreeNode = (root, v) => {
  let queue = [root]
  while (true) {
    var node = queue.pop()
    if (!node.value) {
      node.value = v
      break
    }
    if (!node.left) {
      node.left = {value: v}
      break 
    } else {
      queue.unshift(node.left)
    }

    if (!node.right) {
      node.right = {value: v}
      break 
    } else {
      queue.unshift(node.right)
    }
  }
  console.log('tree', root)
}

preOrder = (root) => {
  let data = []
  function doPreOrder(root) {
    data.push(root.value)
    console.log(root, root.value)
    root.left && doPreOrder(root.left)
    root.right && doPreOrder(root.right)
  }
  doPreOrder(root)
  console.log('data', data)
}

inOrder = (root) => {
  let data = []
  function doPreOrder(root) {
    console.log(root, root.value)
    root.left && doPreOrder(root.left)
    data.push(root.value)
    root.right && doPreOrder(root.right)
  }
  doPreOrder(root)
  console.log('data', data)
}

revert = (p, i) => {
  if (!p || !i) {
    return
  }
  function doRevert(preorder, inorder, node = {}) {
    if (!preorder || !inorder || preorder.length == 0 || inorder.length == 0) {
      return
    }
    const first = preorder[0]
    if (!first) {
      return
    }
    const nextLeftPre = []
    const nextleftIn = []

    let index;
    for (index = 0; index < inorder.length; index ++) {
      if (first == inorder[index]) {
        break
      }
      nextleftIn.push(inorder[index])
    }
    const nextRightIn = inorder.slice(index + 1)
    index = 1;
    for (index; index < nextleftIn.length + 1; index  ++) {
      nextLeftPre.push(preorder[index])
    }

    const nextRightPre = preorder.slice(index)

    node = {
      value: first,
      left: nextLeftPre.length != 0 ? doRevert(nextLeftPre, nextleftIn, {}) : null,
      right: nextRightPre.length != 0 ? doRevert(nextRightPre, nextRightIn, {}) : null,
    }
    return node
  }
  let tree = {}
  tree = doRevert(p, i, tree)
  console.log('tree', tree)
}