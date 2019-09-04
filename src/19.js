// node 节点
function Node(val){
    this.val = val;
    this.next = null;
}

function find(item){
    var currNode = this.head;
    // console.log(currNode)
    while (currNode.val != item){
        currNode = currNode.next;
    }
    return currNode;
}

//插入一个元素
function insert(newVal, item){
    var newNode = new Node(newVal);
    var current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
}

function remove(newVal, item) {
    var current = this.find(item)
    var newCurrent = this.find(newVal)
    current.next = newCurrent.next
}

function display(){
    var currNode = this.head;
    while (!(currNode.next == null)){
        console.log(currNode.val, '\n')
        console.log(currNode.next.next ? true : currNode.next.next, currNode.next.val)
        currNode = currNode.next;
    }
}

// list
function LList(){
    this.head = new Node('head');
    this.find = find;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
}

//测试程序
var llist = new LList();
llist.insert("1", "head");
llist.insert("2", "1");
llist.insert("3", "2");
llist.insert("4", "3");
llist.insert("5", "4");
llist.display();
llist.insert("6", "2");
llist.display();
llist.remove("6", "2");
llist.display();

var removeNthFromEnd = function(head, n) {
    var arr = []

    while (head) {
        console.log(head.val)
        arr.push(new Node(head.val))
        head = head.next
    }

    arr.splice(-n, 1)

    for (var i = 0, len = arr.length; i < len - 1; i++) {
        arr[i].next = arr[i + 1]
    }

    console.log(arr)
    return arr.length === 0 ? null : arr[0]
}

removeNthFromEnd(llist.head, 2)