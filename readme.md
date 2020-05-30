#  js 简单版本的二叉树实现

### 概念
  + 首先二叉树是一颗树，也就是每一个节点(除了root节点外)都存在其父节点，可能存在子节点,对于没有子节点的节点称之为叶子节点。
  + 而二叉树是树的一种特殊情形，也就是每个节点最多只有2个子节点。
  + 通常代表一棵树的都是其跟节点
  + 树的节点： 包含一个数据，以及最多两个子节点，一般称之为左节点，右节点
  + 节点层：跟节点的层定义为1，第一个子节点层定义为2，以此类推
  + 深度：最大的节点层代表了树的深度
  + 满二叉树：除了最深一层(第三层)的叶子节点外，每个节点都有左右两个叶子节点
    ```js
              root (1)
             /    \
            l      r (2)
            /\     /\
           l  r   l  r (3)
    ```
  + 完全二叉树：第二层必须是满二叉树，在满二叉树的基础上，新增加了子节点，但是不全

              root (1)
             /    \
            l      r (2)
            /\     
           l  r        (3)

### 如何用数据结构表示一个树
  
  + 树由节点递归组成，所以首先需要定一个节点
    ```js
    node = {
      value,
      left,
      right,
    }
    ```
    这个就可以简单的理解为一个树的节点，其中value代表节点的数据，left代表左子节点，right代表右子节点。
  + 如何生成一颗满二叉树
    + 思路: 
      + 维护一个当前树节点的链表中，初始值为跟节点。因为需要先进后出的概念，而对于js来说，可以用[]数组来直接实现链表，利用数据提供的方法
        + `shift` 从数组头部移出数据
        + `unshift` 从数据头部插入数据
        + `push`  从数组尾部插入数据
        + `pop` 从数组尾部移出数据
      + 从数组尾部取出第一个数据，也就是跟节点，判断跟节点存不存在，如果不存在就创建，
      + 继续重复从数组中取出下一个节点，先判断左节点是否存在，如果不存在，则创建其左节点，如果存在，则将左节点保存到数组头部中，然后同样的判断其右节点是否存在，如果不存在，则创建其右节点，如果存在，则将右节点保存到数组头部中。
      + 每次新添加一个节点，则重复上面的两个步骤
  ```js
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
  ```

### 如何对二叉树进行遍历
  + 二叉树的遍历存在多种方式，常见的右 `先序遍历`，`中序遍历`, `后序遍历`
           
           1    
          / \      
         2   3  
    + 先序遍历 [1，2，3]
    + 中序遍历 [2, 1, 3]
    + 后序遍历 [3, 1, 2]
+ 编码实现的思路：一颗树实际上是由很多的子节点的组成的，所以问题首先可以拆解为如何遍历一个节点，一个二叉树的节点可能存在 "无", "没有任何子节点", “存在一个左节点”，“存在一个右节点”，“存在一个左节点和一个右节点”
  ```js
   function traverse(node) {
     if (node) {
       console.log(node.value)
     }
     if (node.left) {
       console.log(node.left.value)
     }

     if (node.right) {
       console.log(node.right.value)
     }
   }
  ```
+ 对于一颗树而言，实际上只是对一个节点的扩展，也就是在遍历时，遇到其子节点时，需要对子节点进行同样的操作
```js
  function traverseTree(root) {
    function doTraverse(node) {
      if (node) {
        console.log(node.value)
      }
      node.left && doTraverse(node.left)
      node.right && doTraverse(node.right)
    }
    doTraverse(root)
  }
```

### 如何根据前序遍历，后序遍历的结果重新构建一颗树

  + 先来看一颗树前序遍历和中序遍历结果的区别
    
            1    
           / \      
          2   3 
         / \
        4   5
    + 前序遍历 preOrder:  [1, 2, 4, 5, 3]
    + 中序遍历 inOrder:  [4, 2, 5, 1, 3]

  +  分析； 
    
      + 分析前序遍历: 前序遍历的第一个数据，即为这颗树的```跟节点```，但仅仅根据```根节点```和前序遍历的数据，是不足够重构一颗树的，因为你不能保证这个树其中的某个节点是一个完全节点（也就是左节点和右节点同时存在）。
      + 分析中序遍历: 根据前序遍历得到的结果，能直接推断出 [4, 2, 5] 为 1 的 ```左节点```并且是```中序遍历```的结果， [3] 为 1 的```右节点```并且是```中序遍历```的结果
      + 再次根据上一步推断的结果，我们能推断出，```1```的```左节点```有3个元素，按照```先序遍历```的结论，在 ```preOrder```中，从头部推出一个元素(unshift)后，接下来的3个节点，即为 1 的 ```左节点``` 并且是 `先序遍历`的结果
      + 右节点的推论和左节点的推论一致，
  + 实现: 这里的实现，完全是按照上面的思路完成，没有任何的优化。
  ```js
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
  ```  
    





